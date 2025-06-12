// src/components/activity/ActivityForm.tsx
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useActivityStore } from "../../store/activityStore";
import ImageCloudinary from "../cloudinary/Image";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


interface FormValues {
  title: string;
  description: string;
  xavicoints: number;
}

const schema = yup.object().shape({
  title: yup.string().required("El título es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  xavicoints: yup
    .number()
    .typeError("Debe ser un número")
    .required("Los XaviCoins son obligatorios")
    .min(0, "Debe ser mayor o igual a 0"),
});

const ActivityForm = ({ professorId }: { professorId: number }) => {
  const { addActivity } = useActivityStore();
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      images: imageLinks,
      professorId,
      id: 0, // El ID se asignará automáticamente en el backend
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await addActivity(payload);
    reset();
    setImageLinks([]);
    window.location.reload();
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(13, 55, 69)",
        padding: 4,
        borderRadius: 2,
        color: "white",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" mb={2} sx={{ color: "rgb(224, 127, 63)" }}>
        Crear nueva actividad
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Título"
              variant="outlined"
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(224, 127, 63)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(132, 52, 28)",
                  },
                },
              }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Descripción"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(224, 127, 63)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(132, 52, 28)",
                  },
                },
              }}
            />
          )}
        />

        <Controller
          name="xavicoints"
          control={control}
          defaultValue={0}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="XaviCoins"
              type="number"
              variant="outlined"
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(224, 127, 63)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(132, 52, 28)",
                  },
                },
              }}
            />
          )}
        />

        <Box mt={2} mb={2}>
          <ImageCloudinary setImageLinks={setImageLinks}/>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "rgb(224, 127, 63)",
            "&:hover": {
              backgroundColor: "rgb(132, 52, 28)",
            },
          }}
        >
          Crear Actividad
        </Button>
      </form>
    </Box>
  );
};

export default ActivityForm;
