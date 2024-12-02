import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Script, getScripts } from "../../utils/api";
import { ScriptList } from "../ScriptList";
import { ScriptModal } from "../ScriptModal";

export const FormScripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [filteredScripts, setFilteredScripts] = useState<Script[]>(scripts);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newScript, setNewScript] = useState<Script>({ id: "", title: "", description: "" });
  const [editingScript, setEditingScript] = useState<Script | null>(null);

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

  const handleOpenModal = () => {
    setEditingScript(null);
    setNewScript({ id: "", title: "", description: "" });
    setIsModalOpen(true);
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
          onClick={handleOpenModal}
          className="bg-green-500 ml-5 text-white rounded-[100%] p-5 flex justify-center items-center"
        >
          <MdAdd />
        </button>
      </div>

      <ScriptList
        scripts={filteredScripts}
        setEditingScript={setEditingScript}
        setNewScript={setNewScript}
        setIsModalOpen={setIsModalOpen}
        setScripts={setScripts}
      />

      {isModalOpen && (
        <ScriptModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingScript={editingScript}
          newScript={newScript}
          setNewScript={setNewScript}
          setScripts={setScripts}
        />
      )}
    </div>
  );
};
