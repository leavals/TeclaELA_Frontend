// ImageUploadForm.tsx

import React, { useState } from 'react';

interface ImageUploadFormProps {
    onClose: () => void;
    onSave: (image: File, imageName: string) => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onClose, onSave }) => {
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch('https://teclaela-backend.onrender.com/api/upload/', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        onSave(image, imageName);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        setImage(e.target.files[0]);
                    }
                }}
            />
            <input
                type="text"
                placeholder="Image name"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
            />
            <button type="submit">Upload</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default ImageUploadForm;
