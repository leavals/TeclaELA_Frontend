// ImageUploadForm.tsx

import React, { useState } from 'react';

const ImageUploadForm = () => {
    const [image, setImage] = useState<File | null>(null);

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
            <button type="submit">Upload</button>
        </form>
    );
};

export default ImageUploadForm;
