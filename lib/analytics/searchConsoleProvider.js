import prisma from '@/lib/prisma'
import { getGoogleAccessToken } from '@/lib/indexing'
import { normalizeSiteUrl } from '@/lib/siteUrl'

const SEARCH_ANALYTICS_ENDPOINT = 'https://searchconsole.googleapis.com/webmasters/v3/sites'

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

async function querySearchAnalytics({ accessToken, property, startDate, endDate, dimensions = [], rowLimit = 1000 }) {
  const endpoint = `${SEARCH_ANALYTICS_ENDPOINT}/${encodeURIComponent(property)}/searchAnalytics/query`
  const requestBody = {
    startDate,
    endDate,
    dimensions,
    rowLimit,
    dataState: 'all'
  }
  if (!dimensions.includes('date')) {
    requestBody.orderBy = [{ field: 'clicks', direction: 'DESCENDING' }]
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(result.error?.message || `Search Console API returned HTTP ${response.status}`)
  }
  return result.rows || []
}

function mapMetricRow(row = {}) {
  return {
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(row.ctr || 0) * 100,
    position: Number(row.position || 0)
  }
}

export async function getSearchConsoleAnalytics(range) {
  const days = range === '30d' ? 30 : 7
  const settings = await prisma.setting.findMany({
    where: { key: { in: ['google_service_account_json', 'google_search_console_property', 'site_url'] } },
    select: { key: true, value: true }
  })
  const settingMap = Object.fromEntries(settings.map(item => [item.key, item.value]))

  if (!settingMap.google_service_account_json) {
    const error = new Error('Search Console belum dikonfigurasi. Tambahkan Service Account JSON pada Pengaturan Website.')
    error.code = 'GOOGLE_NOT_CONFIGURED'
    throw error
  }

  let credentials
  try {
    credentials = JSON.parse(settingMap.google_service_account_json)
  } catch {
    const error = new Error('Service Account JSON tidak valid. Periksa kembali file JSON yang dimasukkan.')
    error.code = 'GOOGLE_CREDENTIALS_INVALID'
    throw error
  }

  if (!credentials.client_email || !credentials.private_key) {
    const error = new Error('Service Account JSON harus berisi client_email dan private_key.')
    error.code = 'GOOGLE_CREDENTIALS_INVALID'
    throw error
  }

  const property = settingMap.google_search_console_property?.trim()
    || `${normalizeSiteUrl(settingMap.site_url || 'https://duanarasi.com')}/`
  const accessToken = await getGoogleAccessToken(
    credentials.client_email,
    credentials.private_key,
    'https://www.googleapis.com/auth/webmasters.readonly'
  )

  const end = new Date()
  end.setUTCHours(0, 0, 0, 0)
  end.setUTCDate(end.getUTCDate() - 1)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - days + 1)
  const startDate = formatDate(start)
  const endDate = formatDate(end)

  const [summaryRows, dateRows, queryRows, pageRows] = await Promise.all([
    querySearchAnalytics({ accessToken, property, startDate, endDate, rowLimit: 1 }),
    querySearchAnalytics({ accessToken, property, startDate, endDate, dimensions: ['date'], rowLimit: days }),
    querySearchAnalytics({ accessToken, property, startDate, endDate, dimensions: ['query'], rowLimit: 10 }),
    querySearchAnalytics({ accessToken, property, startDate, endDate, dimensions: ['page'], rowLimit: 10 })
  ])

  const summary = mapMetricRow(summaryRows[0])
  const dailyRows = new Map(dateRows.map(row => [row.keys?.[0], mapMetricRow(row)]))
  const timeseries = Array.from({ length: days }, (_, index) => {
    const date = new Date(start)
    date.setUTCDate(start.getUTCDate() + index)
    const dateKey = formatDate(date)
    return { date: dateKey, ...(dailyRows.get(dateKey) || { clicks: 0, impressions: 0 }) }
  })

  return {
    range: `${days}d`,
    period: { startDate, endDate },
    searchConsole: {
      summary,
      timeseries,
      topQueries: queryRows.map(row => ({
        query: row.keys?.[0] || '',
        ...mapMetricRow(row)
      })),
      topPages: pageRows.map(row => ({
        page: row.keys?.[0] || '',
        ...mapMetricRow(row)
      }))
    }
  }
}