const express = require('express');
const bodyParser = require('body-parser');
const testRoutes = require('./routers/testRouter');
const userRoutes = require('./routers/userRouter');
const { createUserTable } = require('./models/userModel');
const { createEmployeeTable } = require('./models/employeeModel');
const errorHandler = require('./middleware/errorHandler');
const employeeRoutes = require('./routers/employeeRouter');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

app.use('/test', testRoutes); 
app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);

app.use(errorHandler);
createUserTable().catch((err) => console.error('Error creating table:', err));
createEmployeeTable().catch((err) => console.error('Error creating table:', err));
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});