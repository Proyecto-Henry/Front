"use client";

import React, { useEffect, useState } from "react";
import useUserDataStore from "../store";
import { toast } from "sonner";
import { apiUrl } from "@/services/config";
import { Image } from "@heroui/react";
import { img, p } from "framer-motion/client";
import { useRouter } from "next/navigation";


const UploadImageAdmin: React.FC = () => {
  const { userData, setUserData } = useUserDataStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const defaultProfileImage =
    "https://www.strongmarketingfl.com/wp-content/uploads/2023/04/profile.webp";

     const backendDefaultImage =
    "https://example.com/default-image.jpg";


  useEffect(() => {
  //   if (userData?.user.img_profile) {
  //     setPreviewUrl(userData.user.img_profile);
  //   }
  // }, [userData?.user.img_profile]);

  if (userData?.user.img_profile) {
      const img = userData.user.img_profile;
      if (img === backendDefaultImage) {
        setPreviewUrl(defaultProfileImage);
      } else {
        setPreviewUrl(img);
      }
    }
  }, [userData?.user.img_profile]);

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

    // if (img-profile === "https://example.com/default-image.jpg") {
    //     previewUrl = defaultProfileImage
    //   }

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
      setUserData({ ...userData, user: {...userData.user, img_profile: data.imgUrl} });
    } catch (err) {
      console.error("Error en uploadImageAdmin:", err);
      setError((err as Error).message);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };
  
  // {if(userData?.user.img_profile === previewUrl){

  // }}

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!selectedFile || uploading}>
//         {uploading ? "Subiendo..." : "Subir Imagen"}
//       </button>

//       {previewUrl && (
//         <div style={{ marginTop: "1rem" }}>
//           <p>Imagen:</p>
//           <Image
//             // src={previewUrl}
//              src={previewUrl || defaultProfileImage}
//             alt="Imagen de perfil"
//             style={{ width: 200, height: "auto", borderRadius: 8 }}
//           />
//           {!previewUrl && (
//           <p style={{ color: "gray", fontStyle: "italic" }}>
//             No tienes una imagen de perfil aún.
//           </p>
//         )}
//         </div>
//       )}

//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

{/* <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"/> */}
return (
    <div>
      <div className="w-full flex flex-col items-center space-y-4">
      {/* <div className="flex row items-center space-x-4">

      <input
  id="fileInput"
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="hidden"
/>
<label
  htmlFor="fileInput"
  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
>
  Seleccionar imagen
</label>

      <button onClick={handleUpload} disabled={!selectedFile || uploading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50">
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>

      </div> */}

      

      <div style={{ marginTop: "1rem" }}>
        {/* <p>Imagen:</p> */}
        <Image
          src={previewUrl || defaultProfileImage}
          alt="Imagen de perfil"
          style={{ width: 200, height: "auto", borderRadius: 8 }}
        />
        {!previewUrl && (
          <p style={{ color: "gray", fontStyle: "italic" }}>
            No tienes una imagen de perfil aún.
          </p>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

           <div className="className=flex row items-center space-x-4">
      {/* <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"/> */}

      <input
  id="fileInput"
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="hidden"
/>
<label
  htmlFor="fileInput"
  // className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer text-center inline-block"
>
  Cambiar imagen
</label>

      <button onClick={handleUpload} disabled={!selectedFile || uploading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 mt-4">
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>

      </div>


      </div>
    </div>
  );
};

export default UploadImageAdmin;
