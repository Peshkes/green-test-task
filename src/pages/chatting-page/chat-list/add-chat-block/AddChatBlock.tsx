import styles from "./addChatBlock.module.css";
import {useState} from "react";
import AddChatModal from "../add-chat-modal/AddChatModal.tsx";

const AddChatBlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.addChatContainer}>
            <button
                className={styles.addButton}
                onClick={() => setIsModalOpen(true)}
            >
                <p>+</p>
            </button>
            {isModalOpen && <AddChatModal close={() => setIsModalOpen(false)}/>}
        </div>
    )
}
export default AddChatBlock
