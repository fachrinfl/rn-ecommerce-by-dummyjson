import React from 'react';
import Router from './src/navigations/Router';
import {ThemeProvider} from './src/constants/ThemeContext';
import {SafeAreaView} from './src/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const queryClient = new QueryClient({});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </QueryClientProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
