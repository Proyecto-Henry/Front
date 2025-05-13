"use client";

import React, { useEffect, useState } from "react";
import useUserDataStore from "../store";
// import { Upload } from "lucide-react";
import { toast } from "sonner";
import { apiUrl } from "@/services/config";
import { Image } from "@heroui/react";

const UploadImageAdmin: React.FC = () => {
  const { userData, setUserData } = useUserDataStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.img_profile) {
      setPreviewUrl(userData.img_profile);
    }
  }, [userData?.img_profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !userData) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(
        `${apiUrl}/files/uploadImageAdmin/${userData.user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Error al subir la imagen");
      }

      const data = await res.json();
      toast.success("Imagen actualizada");

      setPreviewUrl(data.img_profile);
      setUserData({ ...userData, img_profile: data.img_profile });
    } catch (err) {
      console.error("Error en uploadImageAdmin:", err);
      setError((err as Error).message);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>

      {previewUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>Imagen:</p>
          <Image
            src={previewUrl}
            alt="Imagen de perfil"
            style={{ width: 200, height: "auto", borderRadius: 8 }}
          />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadImageAdmin;
