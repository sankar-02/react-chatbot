// handleKeyDown.ts
export const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, handleSendMessage: () => void) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };
  