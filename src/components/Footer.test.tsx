import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Footer from "./Footer";

vi.mock("./InfoModal", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="info-modal">
      <button onClick={onClose}>close-info</button>
    </div>
  ),
}));
vi.mock("./QRModal", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="qr-modal">
      <button onClick={onClose}>close-qr</button>
    </div>
  ),
}));
vi.mock("./SettingsModal", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="settings-modal">
      <button onClick={onClose}>close-settings</button>
    </div>
  ),
}));

vi.mock("../hooks/useFooter");
import useFooter from "../hooks/useFooter";

const mockSetActiveModal = vi.fn();
const mockHandleInstall = vi.fn();

function mockHook(
  activeModal: "info" | "qr" | "settings" | null = null,
  deferredPrompt: object | null = null,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (useFooter as any).mockReturnValue({ activeModal, setActiveModal: mockSetActiveModal, deferredPrompt, handleInstall: mockHandleInstall });
}

describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHook();
  });

  it("renders the info button", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: "Informationen anzeigen" })).toBeInTheDocument();
  });

  it("renders the QR button", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: "QR-Code anzeigen" })).toBeInTheDocument();
  });

  it("renders the settings button", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: "Einstellungen anzeigen" })).toBeInTheDocument();
  });

  it("does not render the download button without deferredPrompt", () => {
    render(<Footer />);
    expect(screen.queryByRole("button", { name: "App downloaden" })).not.toBeInTheDocument();
  });

  it("renders the download button when deferredPrompt is set", () => {
    mockHook(null, {});
    render(<Footer />);
    expect(screen.getByRole("button", { name: "App downloaden" })).toBeInTheDocument();
  });

  it("calls setActiveModal('info') when info button is clicked", async () => {
    render(<Footer />);
    await userEvent.click(screen.getByRole("button", { name: "Informationen anzeigen" }));
    expect(mockSetActiveModal).toHaveBeenCalledWith("info");
  });

  it("calls setActiveModal('qr') when QR button is clicked", async () => {
    render(<Footer />);
    await userEvent.click(screen.getByRole("button", { name: "QR-Code anzeigen" }));
    expect(mockSetActiveModal).toHaveBeenCalledWith("qr");
  });

  it("calls setActiveModal('settings') when settings button is clicked", async () => {
    render(<Footer />);
    await userEvent.click(screen.getByRole("button", { name: "Einstellungen anzeigen" }));
    expect(mockSetActiveModal).toHaveBeenCalledWith("settings");
  });

  it("calls handleInstall when download button is clicked", async () => {
    mockHook(null, {});
    render(<Footer />);
    await userEvent.click(screen.getByRole("button", { name: "App downloaden" }));
    expect(mockHandleInstall).toHaveBeenCalledTimes(1);
  });

  it("renders InfoModal when activeModal is 'info'", () => {
    mockHook("info");
    render(<Footer />);
    expect(screen.getByTestId("info-modal")).toBeInTheDocument();
  });

  it("renders QRModal when activeModal is 'qr'", () => {
    mockHook("qr");
    render(<Footer />);
    expect(screen.getByTestId("qr-modal")).toBeInTheDocument();
  });

  it("renders SettingsModal when activeModal is 'settings'", () => {
    mockHook("settings");
    render(<Footer />);
    expect(screen.getByTestId("settings-modal")).toBeInTheDocument();
  });

  it("does not render any modal when activeModal is null", () => {
    render(<Footer />);
    expect(screen.queryByTestId("info-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("qr-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-modal")).not.toBeInTheDocument();
  });

  it("calls setActiveModal(null) when InfoModal closes", async () => {
    mockHook("info");
    render(<Footer />);
    await userEvent.click(screen.getByText("close-info"));
    expect(mockSetActiveModal).toHaveBeenCalledWith(null);
  });

  it("calls setActiveModal(null) when QRModal closes", async () => {
    mockHook("qr");
    render(<Footer />);
    await userEvent.click(screen.getByText("close-qr"));
    expect(mockSetActiveModal).toHaveBeenCalledWith(null);
  });

  it("calls setActiveModal(null) when SettingsModal closes", async () => {
    mockHook("settings");
    render(<Footer />);
    await userEvent.click(screen.getByText("close-settings"));
    expect(mockSetActiveModal).toHaveBeenCalledWith(null);
  });
});
