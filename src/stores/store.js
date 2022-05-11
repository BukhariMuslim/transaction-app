import {configureStore} from '@reduxjs/toolkit';

import transaction from './transaction';

export default configureStore({
  reducer: {
    transaction,
  },
});
