import styles from "./addChatModal.module.css";
import React, { useState } from "react";
import { useChat } from "../../../../features/chatting/useChat.ts";

const AddChatModal = ({ close }: { close: () => void }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Состояние для ошибки
    const createChat = useChat((state) => state.createChat);

    // Функция для валидации номера телефона
    const validatePhoneNumber = (number: string): boolean => {
        const regex = /^\+[0-9]{7,}$/; // Номер должен начинаться с + и содержать минимум 7 цифр
        return regex.test(number);
    };

    const handleCreateChat = async (e: React.FormEvent) => {
        e.preventDefault();

        // Валидация номера
        if (!validatePhoneNumber(phoneNumber)) {
            setError('Номер должен начинаться с + и содержать минимум 7 цифр');
            return;
        }

        setIsLoading(true);
        setError(null); // Сброс ошибки перед запросом

        try {
            await createChat(phoneNumber);
            close();
            setPhoneNumber('');
        } catch (error) {
            console.error('Ошибка создания чата:', error);
            setError('Не удалось создать чат. Попробуйте еще раз.'); // Ошибка от сервера
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={close}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h3>Создать новый чат</h3>
                <form onSubmit={handleCreateChat}>
                    <input
                        type="tel"
                        placeholder="Введите номер телефона"
                        className={styles.phoneInput}
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setError(null); // Сброс ошибки при изменении номера
                        }}
                        required
                    />
                    {error && <p className={styles.errorMessage}>{error}</p>} {/* Отображение ошибки */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Создание...' : 'Создать чат'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddChatModal;
