import {configureStore} from '@reduxjs/toolkit';

import transaction from '@stores/transaction';

export default configureStore({
  reducer: {
    transaction,
  },
});
