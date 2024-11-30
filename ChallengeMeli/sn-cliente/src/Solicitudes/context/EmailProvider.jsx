import { useEmail } from "../hooks/useEmail";
import { EmailContext } from "./EmailContext";

export const EmailProvider = ({ children }) => {
    const {
        email,
        saveEmail,
        sendDocument 

  } = useEmail();
  
    return (
      <EmailContext.Provider
        value={{
            email,
            saveEmail,
            sendDocument 
        }}
      >
        {children}
      </EmailContext.Provider>
    );
  };
  