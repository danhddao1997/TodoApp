import React from 'react';
import AppNavigation from 'navigation';
import {RealmProvider} from 'utils/realm';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoadingModal from 'components/modals/LoadingModal';
import {Provider} from 'react-redux';
import store from 'appRedux';

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
