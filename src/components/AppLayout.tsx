/**
 * Layout principal da aplicação Futuro em Rede.
 * Inclui sidebar de navegação, banner de rede e área de conteúdo.
 * Responsivo: sidebar colapsa em mobile para menu hambúrguer.
 */
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Archive, PenLine, Users, MessageCircle, BookOpen, CalendarDays,
  Home, Menu, X, Leaf
} from 'lucide-react';
import NetworkStatusBanner from './NetworkStatusBanner';
import { useNetworkStatus, type NetworkMode } from '@/hooks/useNetworkStatus';
import { useTranslation } from '@/i18n/useTranslation';

const navItems = [
  { path: '/', icon: Home, labelKey: 'home' as const },
  { path: '/archive', icon: Archive, labelKey: 'archive' as const },
  { path: '/contribute', icon: PenLine, labelKey: 'contribute' as const },
  { path: '/workshops', icon: Users, labelKey: 'workshops' as const },
  { path: '/messages', icon: MessageCircle, labelKey: 'messages' as const },
  { path: '/library', icon: BookOpen, labelKey: 'library' as const },
  { path: '/calendar', icon: CalendarDays, labelKey: 'calendar' as const },
];

export default function AppLayout() {
  const { t } = useTranslation();
  const { mode, cycleMode } = useNetworkStatus();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Banner de rede */}
      <NetworkStatusBanner mode={mode} onCycle={cycleMode} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar desktop */}
        <aside className="hidden w-64 flex-shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
          <div className="flex items-center gap-3 px-6 py-5">
            <Leaf className="h-7 w-7 text-sidebar-primary" aria-hidden="true" />
            <div>
              <h1 className="font-display text-lg font-bold text-sidebar-primary">{t.app.name}</h1>
              <p className="text-xs text-sidebar-foreground/70">{t.app.tagline}</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-3" aria-label="Navegação principal">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`
                }
                aria-label={t.nav[item.labelKey]}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {t.nav[item.labelKey]}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-sidebar-border px-6 py-4">
            <p className="text-xs text-sidebar-foreground/50">GPL v3 · Bairro C, Guimarães</p>
          </div>
        </aside>

        {/* Mobile menu button */}
        <button
          className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground shadow-xl">
              <div className="flex items-center gap-3 px-6 py-5">
                <Leaf className="h-7 w-7 text-sidebar-primary" aria-hidden="true" />
                <h1 className="font-display text-lg font-bold text-sidebar-primary">{t.app.name}</h1>
              </div>
              <nav className="space-y-1 px-3">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {t.nav[item.labelKey]}
                  </NavLink>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto" role="main">
          <Outlet context={{ networkMode: mode } as { networkMode: NetworkMode }} />
        </main>
      </div>
    </div>
  );
}
