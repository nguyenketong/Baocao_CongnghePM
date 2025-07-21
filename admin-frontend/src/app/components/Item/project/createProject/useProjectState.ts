import { useState } from 'react';

export const useProjectState = () => {
  const [priority, setPriority] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return {
    priority,
    setPriority,
    file,
    setFile,
    onFileChange
  };
};
