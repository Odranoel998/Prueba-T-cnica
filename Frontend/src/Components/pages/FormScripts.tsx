import { useEffect, useState } from "react";
import { MdAdd, MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Script, createScript, editScript, getScripts, deleteScript } from "../../utils/api";

export const FormScripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [filteredScripts, setFilteredScripts] = useState<Script[]>(scripts);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newScript, setNewScript] = useState<Script>({ id: "", title: "", description: "" });
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null); 

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const data = await getScripts();
        setScripts(data);
      } catch (error) {
        console.error("Error fetching scripts:", error);
      }
    };
    fetchScripts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = scripts.filter((script) =>
        script.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredScripts(filtered);
    } else {
      setFilteredScripts(scripts);
    }
  }, [searchTerm, scripts]);

  const handleCreate = async () => {
    if (newScript.title) {
      try {
        const createdScript = await createScript(newScript);
        setScripts((prevScripts) => [...prevScripts, createdScript]);
        setFilteredScripts((prevFilteredScripts) => [...prevFilteredScripts, createdScript]);
        setNewScript({ id: "", title: "", description: "" });
        setIsModalOpen(false);
      } catch (error) {
        console.log("Error al crear el script", error);
      }
    }
  };

  const handleEdit = async () => {
    if (editingScript) {  
      try {
        const updatedScript = await editScript(editingScript.id, newScript);
        setScripts((prevScripts) =>
          prevScripts.map((script) =>
            script.id === updatedScript.id ? updatedScript : script
          )
        );
        setFilteredScripts((prevFilteredScripts) =>
          prevFilteredScripts.map((script) =>
            script.id === updatedScript.id ? updatedScript : script
          )
        );
        setNewScript({ id: "", title: "", description: "" });
        setIsModalOpen(false);
        setEditingScript(null);  
      } catch (error) {
        console.log("Error al editar el script", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteScript(id);
      setScripts((prevScripts) => prevScripts.filter((script) => script.id !== id));
      setFilteredScripts((prevFilteredScripts) => prevFilteredScripts.filter((script) => script.id !== id));
    } catch (error) {
      console.error("Error al eliminar el script", error);
    }
  };

  return (
    <div className="m-4">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          placeholder="Buscar scripts por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setEditingScript(null);
            setNewScript({ id: "", title: "", description: "" });
            setIsModalOpen(true);
          }}
          className="bg-green-500 ml-5 text-white rounded-[100%] p-5 flex justify-center items-center"
        >
          <MdAdd />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[600px]">
            <h2 className="text-xl font-semibold mb-4">{editingScript ? "Editar Script" : "Crear Script"}</h2>
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
              <button
                onClick={editingScript ? handleEdit : handleCreate}
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
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
      )}

      <div className="border-2 border-gray-300 rounded-lg p-4">
        {filteredScripts.length === 0 ? (
          <p className="text-gray-500 text-center">No hay scripts para mostrar.</p>
        ) : (
          filteredScripts.map((script) => (
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
                        setNewScript({ id: script.id, title: script.title, description: script.description });
                        setIsModalOpen(true);
                      }}
                      className="bg-blue-300 text-white px-4 py-2 rounded flex items-center"
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
    </div>
  );
};
