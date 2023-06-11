import store from 'appRedux';
import LoadingModal from 'components/modals/LoadingModal';
import AppNavigation from 'navigation';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {RealmProvider} from 'utils/realm';

const App = () => {
  return (
    <RealmProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigation />
          <LoadingModal />
        </SafeAreaProvider>
      </Provider>
    </RealmProvider>
  );
};

export default App;
