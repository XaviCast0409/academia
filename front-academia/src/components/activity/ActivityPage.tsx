import { Box, Container, Grid, Typography, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useActivityStore } from "../../store/activityStore";
import { ConfirmDialog } from "../../utils/ConfirmDialog";
import { ActivityCard } from "./ActivityCard";
import { useNavigate, Link } from "react-router-dom";

export const ActivityPage = () => {
	const ACTIVITIES_PER_PAGE = 10;
	const navigate = useNavigate();
	const { activities, fetchActivities, removeActivity } = useActivityStore();

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [page, setPage] = useState(1);

	const totalPages = Math.ceil(activities.length / ACTIVITIES_PER_PAGE);

	const paginatedActivities = activities.slice(
		(page - 1) * ACTIVITIES_PER_PAGE,
		page * ACTIVITIES_PER_PAGE
	);

	useEffect(() => {
		fetchActivities();
	}, []);

	const handleDelete = (id: number) => {
		setSelectedId(id);
		setConfirmOpen(true);
	};

	const confirmDelete = async () => {
		if (selectedId !== null) {
			await removeActivity(selectedId);
			setConfirmOpen(false);
		}
	};

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Container sx={{ py: 4 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h4" color="primary.dark">Actividades</Typography>
				<Button variant="contained" color="primary" sx={{ bgcolor: '#0D3745' }} onClick={() => navigate("/admin/actividad")}>
					Agregar Actividad
				</Button>
			</Box>
			<Grid container spacing={2}>
				{paginatedActivities.map((activity) => (
					<Grid key={activity.id} {...({} as any)}>
						<Link to={`/admin/actividad/registroEvidence/${activity.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
							<ActivityCard
								activity={activity}
								onDelete={() => handleDelete(activity.id)}
							/>
						</Link>
					</Grid>
				))}
			</Grid>
			<Box display="flex" justifyContent="center" mt={4}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					color="primary"
				/>
			</Box>
			<ConfirmDialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				onConfirm={confirmDelete}
				title="Eliminar Actividad"
				message="¿Estás seguro de que deseas eliminar esta actividad?"
			/>
		</Container>
	);
}
export default ActivityPage;