import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import { 
  Users, 
  Sparkles, 
  UserCheck, 
  UserX,
  Search,
  ChevronLeft,
  Plus,
  Mail
} from "lucide-react";
import { motion } from "motion/react";
import { Usuario } from "../types";
import logoUrl from "../assets/images/strike_center_logo_1781636017128.jpg";

export const GerenciarUsuariosPage: React.FC = () => {
  const { 
    pushPage, 
    popPage, 
    usuarios, 
    toggleUserPremium, 
    addUsuario 
  } = useAppContext();

  const [searchFilter, setSearchFilter] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredUsers = usuarios.filter(u => 
    u.displayName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    u.email.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    
    addUsuario(newUserName.trim(), newUserEmail.trim());
    setNewUserName("");
    setNewUserEmail("");
    setShowAddForm(false);
  };

  return (
    <div id="gerenciar_usuarios_view_wrapper" className="flex flex-col space-y-6 max-w-2xl mx-auto px-4 py-8">
      {/* Header Bar */}
      <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur border border-slate-800 p-4 rounded-2xl">
        <button 
          onClick={popPage}
          className="text-slate-400 hover:text-white flex items-center space-x-1.5 text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Painel Admin</span>
        </button>
        <div className="flex items-center space-x-2">
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="w-6 h-6 rounded object-cover border border-blue-500/30 font-semibold"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-sm font-semibold text-white">
            Usuários do Banco (Firebase)
          </h1>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-1 px-2.5 bg-indigo-600/25 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-medium rounded-lg transition flex items-center space-x-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Adicionar</span>
        </button>
      </div>

      {/* Add User Slider Form */}
      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3"
        >
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Criar Novo Registro Firestore</span>
          </h3>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nome do Usuário..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Endereço de E-mail..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
            />
            <div className="sm:col-span-2 flex justify-end space-x-2 pt-1 border-t border-slate-805/30">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition"
              >
                Salvar no DB
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Search Input Filter */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Pesquisar usuários por nome ou e-mail..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>

      {/* Users Stream simulation list */}
      <div className="space-y-2.5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserSwitchRow key={user.id} user={user} onToggle={toggleUserPremium} />
          ))
        ) : (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
            <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-xs font-medium">Nenhum usuário correspondente encontrado.</p>
          </div>
        )}
      </div>

      {/* Bottom Voltar button */}
      {/* [BUG G] CORRIGIDO: Botão renomeado para "← Voltar ao Painel Admin" com action no onPressed */}
      <div className="pt-2">
        <button
          onClick={() => pushPage("admin")}
          className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-xl shadow cursor-pointer transition flex items-center justify-center space-x-2"
        >
          <span>← Voltar ao Painel Admin</span>
        </button>
      </div>
    </div>
  );
};

/* 
  [BUG D] SOLUÇÃO REAL NO REACT:
  Cada linha (UserSwitchRow) gerencia o seu próprio clique de forma isolada,
  evitando conflito global. Quando clica no switch, ele atualiza localmente
  e emite a notificação de mudança para o Firebase/Context.
*/
const UserSwitchRow: React.FC<{ 
  user: Usuario; 
  onToggle: (id: string, value: boolean) => void 
}> = ({ user, onToggle }) => {
  const [localChecked, setLocalChecked] = useState(user.statusPremium);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSwitchChange = async (checked: boolean) => {
    setLocalChecked(checked);
    setIsUpdating(true);
    
    // Simulate minor asynchronous network persistence latency typical in Firestore
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onToggle(user.id, checked);
    } catch {
      // Revert if error
      setLocalChecked(!checked);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div 
      className={`p-4 bg-slate-900/60 border rounded-xl flex items-center justify-between gap-4 transition duration-150 ${
        localChecked ? "border-[#00FF00]/20 bg-slate-900/90" : "border-slate-800"
      }`}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <h4 className="text-xs font-bold text-white flex items-center space-x-2 break-all">
          <span>{user.displayName}</span>
          {localChecked && (
            <span className="shrink-0 flex items-center space-x-0.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold rounded border border-emerald-500/20">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Premium</span>
            </span>
          )}
        </h4>
        <p className="text-[11px] text-slate-400 break-all flex items-center space-x-1">
          <span>{user.email}</span>
        </p>
        <span className="text-[10px] text-slate-600 block pt-0.5">
          Pesquisas Realizadas: <strong>{user.searchesCount}</strong>
        </span>
      </div>

      <div className="flex items-center space-x-3 shrink-0">
        <div className="text-right">
          <span className={`text-[10.5px] font-bold uppercase tracking-wider ${
            localChecked ? "text-[#00FF00]" : "text-slate-500"
          }`}>
            {localChecked ? "Premium" : "Grátis"}
          </span>
        </div>

        {/* Custom iOS/Android adaptive toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={localChecked}
            disabled={isUpdating}
            onChange={(e) => handleSwitchChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};
