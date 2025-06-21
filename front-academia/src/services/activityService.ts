import { api } from '../utils/api';
import type { Activity } from '../types/activity';

export const getActivity = async (id: number): Promise<any> => {
  const response = await api.get(`/activities/${id}`);
  return response.data;
};

export const getActivities = async (): Promise<any[]> => {
  const response = await api.get('/activities');
  return response.data;
};

export const createActivity = async (data: any): Promise<any> => {
  console.log('Creating activity with data:', data);
  
  const response = await api.post(`/activities/create`, data);
  return response.data;
};

export const updateActivity = async (id: number, data: any): Promise<any> => {
  const response = await api.put(`/activities/${id}`, data);
  return response.data;
};

export const deleteActivity = async (id: number): Promise<any> => {
  const response = await api.delete(`/activities/${id}`);
  return response.data;
};

export const getAvailableActivitiesForStudentPaginated = async (studentId: number, page: number, limit: number, section: string): Promise<any> => {
  const response = await api.get(`/activities/available/${studentId}?section=${section}`, {
    params: { page, limit }
  });
  return response.data;
};

export const changeEvidenceStatusAndAddXavicoints = async (activityId: number, data: any): Promise<Activity> => {
  const response = await api.post(`/activities/change/evidence/${activityId}`, data);
  return response.data;
};

export const getActivityByProfessor = async (professorId: number, page: number = 1, pageSize: number = 10, section?: string): Promise<any> => {
  const params: any = { page, pageSize };
  if (section) {
    params.section = section;
  }
  const response = await api.get(`/activities/professor/${professorId}`, { params });
  return response.data;
};