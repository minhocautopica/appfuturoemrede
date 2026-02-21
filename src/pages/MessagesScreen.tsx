/**
 * Mensagens de Vizinhança — só disponíveis em modo mesh.
 * Mostra mensagens assíncronas entre totens. Em outros modos, exibe aviso.
 */
import { useOutletContext } from 'react-router-dom';
import { MessageCircle, Radio, Send } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockMessages } from '@/data/mockData';
import type { NetworkMode } from '@/hooks/useNetworkStatus';

export default function MessagesScreen() {
  const { t } = useTranslation();
  const { networkMode } = useOutletContext<{ networkMode: NetworkMode }>();
  const [newMsg, setNewMsg] = useState('');

  /* Mensagens só existem na mesh */
  if (networkMode !== 'mesh') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <Radio className="mx-auto mb-4 h-12 w-12 text-muted-foreground" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold">{t.messages.title}</h2>
          <p className="mt-2 max-w-md text-muted-foreground">{t.messages.mesh_only}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            Activa o modo Mesh no banner de rede (🔵) para ver as mensagens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">{t.messages.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.messages.subtitle}</p>
      </header>

      {/* Lista de mensagens */}
      <div className="mb-6 space-y-3">
        {mockMessages.map(msg => (
          <div key={msg.id} className="animate-fade-in-up rounded-lg border bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Radio className="h-3 w-3" aria-hidden="true" />
              <span>{t.messages.from_totem}: {msg.totem_origin.replace('_', ' ')}</span>
              {msg.totem_destination && (
                <span>→ {msg.totem_destination.replace('_', ' ')}</span>
              )}
            </div>
            <p className="text-sm">{msg.content}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{msg.author_display ?? t.common.anonymous}</span>
              <span>·</span>
              <time dateTime={msg.created_at}>
                {new Date(msg.created_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}
              </time>
            </div>
          </div>
        ))}
      </div>

      {/* Nova mensagem */}
      <form
        onSubmit={e => { e.preventDefault(); setNewMsg(''); }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          placeholder={t.messages.placeholder}
          className="flex-1 rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent"
          aria-label={t.messages.placeholder}
        />
        <button
          type="submit"
          disabled={!newMsg.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
          aria-label={t.messages.send}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
