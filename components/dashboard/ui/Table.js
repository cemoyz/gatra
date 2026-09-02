import React from 'react'

export const Table = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      overflowX: 'auto'
    }}
  >
    <table
      ref={ref}
      className={`dash-table ${className}`}
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '13px',
        ...style
      }}
      {...props}
    >
      {children}
    </table>
  </div>
))
Table.displayName = 'Table'

export const TableHeader = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <thead
    ref={ref}
    className={`dash-table-header ${className}`}
    style={{
      background: 'var(--dash-muted-bg)',
      borderBottom: '1px solid var(--dash-border)',
      ...style
    }}
    {...props}
  >
    {children}
  </thead>
))
TableHeader.displayName = 'TableHeader'

export const TableBody = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`dash-table-body ${className}`}
    style={{
      ...style
    }}
    {...props}
  >
    {children}
  </tbody>
))
TableBody.displayName = 'TableBody'

export const TableRow = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <tr
    ref={ref}
    className={`dash-table-row ${className}`}
    style={{
      borderBottom: '1px solid var(--dash-border)',
      transition: 'background-color 0.15s ease',
      ...style
    }}
    {...props}
  >
    {children}
  </tr>
))
TableRow.displayName = 'TableRow'

export const TableHead = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <th
    ref={ref}
    className={`dash-table-head ${className}`}
    style={{
      height: '40px',
      padding: '0 16px',
      verticalAlign: 'middle',
      fontWeight: 600,
      fontSize: '12px',
      color: 'var(--dash-text-muted)',
      whiteSpace: 'nowrap',
      ...style
    }}
    {...props}
  >
    {children}
  </th>
))
TableHead.displayName = 'TableHead'

export const TableCell = React.forwardRef(({ className = '', style = {}, children, ...props }, ref) => (
  <td
    ref={ref}
    className={`dash-table-cell ${className}`}
    style={{
      padding: '12px 16px',
      verticalAlign: 'middle',
      color: 'var(--dash-text-main)',
      ...style
    }}
    {...props}
  >
    {children}
  </td>
))
TableCell.displayName = 'TableCell'
