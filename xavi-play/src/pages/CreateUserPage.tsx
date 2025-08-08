import React from 'react';
import { CreateUserScreen } from '@/pages/CreateUser/CreateUserScreen';
import ScreenWrapper from '@/components/common/ScreenWrapper';

const CreateUserPage: React.FC = () => {
  return (
    <ScreenWrapper>
      <CreateUserScreen />
    </ScreenWrapper>
  );
};

export default CreateUserPage;