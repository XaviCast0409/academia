import { create } from "zustand";
import type { Activity, ActivityInput } from "../types/activity";
import { createActivity, getActivities, updateActivity, deleteActivity, getAvailableActivitiesForStudentPaginated, changeEvidenceStatusAndAddXavicoints } from "../services/activityService";
interface ActivityState {
  activities: Activity[];
  page: number;
  totalPages: number;
  pageSize: number;
  fetchActivities: () => Promise<void>;
  addActivity: (activity: Activity) => Promise<void>;
  editActivity: (id: number, activity: Activity) => Promise<void>;
  removeActivity: (id: number) => Promise<void>;
  getAvailableActivitiesForStudentPaginated: (studentId: number, page: number, limit: number) => Promise<void>;
  changeEvidenceStatusAndAddXavicoints: (activityId: number, data: any) => Promise<Activity>;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,

  fetchActivities: async () => {
    try {
      const activities = await getActivities();
      set({ activities });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  },

  addActivity: async (activity: ActivityInput) => {
    try {
      const newActivity = await createActivity(activity);
      set((state) => ({ activities: [...state.activities, newActivity] }));
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  },

  editActivity: async (id: number, activity: Activity) => {
    try {
      const updatedActivity = await updateActivity(id, activity);
      set((state) => ({
        activities: state.activities.map((a) =>
          a.id === updatedActivity.id ? updatedActivity : a
        ),
      }));
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  },

  removeActivity: async (id: number) => {
    try {
      await deleteActivity(id);
      set((state) => ({
        activities: state.activities.filter((activity) => activity.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  },

  getAvailableActivitiesForStudentPaginated: async (studentId: number, page: number, limit: number) => {
    try {
      const activities = await getAvailableActivitiesForStudentPaginated(studentId, page, limit);
      set({ activities: activities.activities });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  },
  changeEvidenceStatusAndAddXavicoints: async (activityId: number, data: any) => {
    try {
      const updatedActivity = await changeEvidenceStatusAndAddXavicoints(activityId, data);
      set((state) => ({
        activities: state.activities.map((a) =>
          a.id === updatedActivity.id ? updatedActivity : a
        ),
      }));
      console.log("Updated activity after changing evidence status:", updatedActivity);
      
      return updatedActivity; // 👈 importante
    } catch (error) {
      console.error("Error changing evidence status and adding Xavicoints:", error);
      throw error;
    }
  },
  setPage: (page: number) => set({ page }),
  setTotalPages: (totalPages: number) => set({ totalPages})
}));