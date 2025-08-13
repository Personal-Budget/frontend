import Modal from "../../../modal/handler/modal_base.svelte";
import LoginContent from "../../../modal/dialogs/login.svelte";
import { registerModal } from "../registry";

export function registerAllModals() {
	registerModal("login", Modal, { title: "" }, LoginContent);
	registerModal("register", Modal, { title: "", register: true }, LoginContent);
}
