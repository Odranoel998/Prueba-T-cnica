import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Script, deleteScript } from "../utils/api";

interface ScriptListProps {
  scripts: Script[];
  setEditingScript: (script: Script | null) => void;
  setNewScript: (script: Script) => void;
  setIsModalOpen: (open: boolean) => void;
  setScripts: (scripts: Script[]) => void;
}

export const ScriptList = ({
  scripts,
  setEditingScript,
  setNewScript,
  setIsModalOpen,
  setScripts,
}: ScriptListProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteScript(id);
      setScripts((prev) => prev.filter((script) => script.id !== id));
    } catch (error) {
      console.error("Error al eliminar el script", error);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4">
      {scripts.length === 0 ? (
        <p className="text-gray-500 text-center">No hay scripts para mostrar.</p>
      ) : (
        scripts.map((script) => (
          <div key={script.id} className="mb-4 border-b-2 border-gray-300">
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-500">{script.title}</h3>
                  {expanded === script.id && (
                    <p className="text-gray-700 mt-2">{script.description}</p>
                  )}
                </div>
                <button
                  onClick={() => setExpanded(expanded === script.id ? null : script.id)}
                  className="text-blue-500 text-xl"
                >
                  {expanded === script.id ? "▲" : "▼"}
                </button>
              </div>
              {expanded === script.id && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setEditingScript(script);
                      setNewScript(script);
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  >
                    <MdEdit className="mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(script.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
