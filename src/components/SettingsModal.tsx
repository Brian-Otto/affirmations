import { applyTheme, type Theme } from "../utils/theme";
import Modal from "./Modal"

function SettingsModal({ onClose }: { onClose: () => void }) {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    applyTheme(e.target.value as Theme)
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full flex justify-between items-center">
        <label htmlFor="theme">Theme</label>

        <select
          onChange={handleThemeChange}
          className="bg-ctp-base border border-ctp-lavender focus:outline-ctp-lavender focus:outline-1 px-2 py-1 rounded"
          name="theme"
          id="theme"
          defaultValue={localStorage.getItem("theme") || "system"}
        >
          <option value="system">System</option>
          <option value="light">Hell</option>
          <option value="dark">Dunkel</option>
        </select>
      </div>
    </Modal>
  )
}

export default SettingsModal