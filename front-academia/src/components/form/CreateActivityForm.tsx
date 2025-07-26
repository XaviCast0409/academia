import { useForm } from "react-hook-form";
import {
  Button,
  Box,
} from "@mui/material";
import { useActivityStore } from "../../store/activityStore";
import ImageCloudinary from "../cloudinary/Image";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

import CustomTextField from "../shared/CustomTextField";
import { PageHeader, GameCard } from '../common';
import { useResponsive } from '../../shared';

interface FormValues {
  title: string;
  description: string;
  xavicoints: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  section: string;
}

const schema = yup.object().shape({
  title: yup.string().required("El título es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  xavicoints: yup
    .number()
    .typeError("Debe ser un número")
    .required("Los XaviCoins son obligatorios")
    .min(0, "Debe ser mayor o igual a 0"),
  difficulty: yup
    .string()
    .oneOf(["beginner", "intermediate", "advanced", "expert"], "Selecciona una dificultad válida")
    .required("La dificultad es obligatoria"),
  section: yup.string().required("La sección es obligatoria"),
});

interface CreateActivityFormProps {
  professorId: number;
}

const CreateActivityForm = ({ professorId }: CreateActivityFormProps) => {
  const { addActivity } = useActivityStore();
  const [uploaderKey, setUploaderKey] = useState<number>(0);
  const { isMobile } = useResponsive();
  
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      xavicoints: 0,
      difficulty: "beginner",
      section: "",
    },
  });
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  const handleImageUpload = (urls: string[]) => {
    setImageLinks(urls);
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      images: imageLinks,
      professorId,
    };

    try {
      await addActivity(payload);

      Swal.fire({
        title: "¡Actividad creada!",
        text: "La actividad se ha creado exitosamente.",
        icon: "success",
        confirmButtonColor: "rgb(224, 127, 63)",
        confirmButtonText: "Aceptar",
      }).then(() => {
        reset();
        setImageLinks([]);
        setUploaderKey((prev) => prev + 1);
      });
    } catch (error) {
      console.error("Error al crear la actividad:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la actividad. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "rgb(224, 127, 63)",
      });
    }
  };

  return (
    <Box
      sx={{
        py: 5,
        px: 2,
        maxWidth: 'md',
        mx: 'auto',
        fontFamily: 'Press Start 2P'
      }}
    >
      <PageHeader
        title="Crear Nueva Actividad"
        subtitle="Define una nueva actividad para los estudiantes"
      />
      
      <GameCard>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <CustomTextField
            name="title"
            control={control}
            label="Título"
          />

          <CustomTextField
            name="description"
            control={control}
            label="Descripción"
            multiline
            rows={4}
          />

          <CustomTextField
            name="difficulty"
            control={control}
            label="Dificultad"
            select
            options={[
              { value: "beginner", label: "Principiante" },
              { value: "intermediate", label: "Intermedio" },
              { value: "advanced", label: "Avanzado" },
              { value: "expert", label: "Experto" }
            ]}
          />

          <CustomTextField
            name="xavicoints"
            control={control}
            label="XaviCoins"
            type="number"
          />

          <CustomTextField
            name="section"
            control={control}
            label="Sección"
            select
            options={[
              { value: "1ro Secundaria", label: "1ro Secundaria" },
              { value: "2do Secundaria", label: "2do Secundaria" },
              { value: "3ro Secundaria", label: "3ro Secundaria" },
              { value: "4to Secundaria", label: "4to Secundaria" },
              { value: "5to Secundaria", label: "5to Secundaria" }
            ]}
          />

          <Box mt={3} mb={3}>
            <ImageCloudinary
              setImageLinks={handleImageUpload}
              resetUploader={uploaderKey}
              maxFiles={5}
              maxFileSize={5 * 1024 * 1024}
              title="Imágenes de la Actividad"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 2,
              backgroundColor: 'primary.main',
              fontFamily: 'Press Start 2P',
              fontSize: isMobile ? '0.7rem' : '0.9rem',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }}
          >
            Crear Actividad
          </Button>
        </Box>
      </GameCard>
    </Box>
  );
};

export default CreateActivityForm;
