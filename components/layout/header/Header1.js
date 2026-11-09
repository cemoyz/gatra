import KompasHeader from "@/components/kompas/KompasHeader"

export default function Header1({ scroll, handleMobileMenu, settings = {} }) {
  return <KompasHeader scroll={scroll} handleMobileMenu={handleMobileMenu} settings={settings} />
}
