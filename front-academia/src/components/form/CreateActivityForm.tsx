import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useActivityStore } from "../../store/activityStore";
import ImageCloudinary from "../cloudinary/Image";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { addActivity } = useActivityStore();
  const [uploaderKey, setUploaderKey] = useState<number>(0);
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      images: imageLinks,
      professorId,
    };

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
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(13, 55, 69)",
        padding: isMobile ? 3 : 5,
        borderRadius: 3,
        color: "white",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        variant="h5"
        mb={3}
        sx={{
          color: "rgb(224, 127, 63)",
          textAlign: "center",
          fontSize: isMobile ? "1.1rem" : "1.5rem",
          fontFamily: `'Press Start 2P', cursive`,
        }}
      >
        Crear Nueva Actividad
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

        <Box mt={3} mb={3}>
          <ImageCloudinary
            setImageLinks={setImageLinks}
            resetUploader={uploaderKey}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "rgb(224, 127, 63)",
            fontSize: isMobile ? "0.8rem" : "1rem",
            padding: isMobile ? "0.6rem" : "0.8rem",
            fontWeight: "bold",
            fontFamily: `'Press Start 2P', cursive`,
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
