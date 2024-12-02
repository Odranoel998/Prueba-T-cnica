import { Script, createScript, editScript } from "../utils/api";

interface ScriptModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editingScript: Script | null;
  newScript: Script;
  setNewScript: (script: Script) => void;
  setScripts: (scripts: Script[]) => void;
}

export const ScriptModal = ({
  isModalOpen,
  setIsModalOpen,
  editingScript,
  newScript,
  setNewScript,
  setScripts,
}: ScriptModalProps) => {
  const handleSave = async () => {
    try {
      if (editingScript) {
        const updatedScript = await editScript(editingScript.id, newScript);
        setScripts((prev) =>
          prev.map((script) => (script.id === updatedScript.id ? updatedScript : script))
        );
      } else {
        const createdScript = await createScript(newScript);
        setScripts((prev) => [...prev, createdScript]);
      }
      setIsModalOpen(false);
      setNewScript({ id: "", title: "", description: "" });
    } catch (error) {
      console.error("Error al guardar el script:", error);
    }
  };

  return isModalOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-[600px]">
        <h2 className="text-xl font-semibold mb-4">
          {editingScript ? "Editar Script" : "Crear Script"}
        </h2>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Título"
            value={newScript.title}
            onChange={(e) => setNewScript({ ...newScript, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="border border-gray-300 rounded-lg px-4 py-2 w-full h-[250px]"
            placeholder="Descripción"
            value={newScript.description}
            onChange={(e) => setNewScript({ ...newScript, description: e.target.value })}
          />
        </div>
        <div className="flex justify-between">
          <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded">
            {editingScript ? "Actualizar" : "Crear"}
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
