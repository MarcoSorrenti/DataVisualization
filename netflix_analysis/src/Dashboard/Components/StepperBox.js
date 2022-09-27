import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import BarChartIcon from '@mui/icons-material/BarChart';

import Paper from '@mui/material/Paper';

const steps = ['Select the dataset', 'Select analysis'];

export default function StepperBox() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const form_content = [["Dataset", ["Netflix", "Netflix TV Series", "Netflix Movies"]], ["Analysis", ["Overview", "Trend", "Text-Based"]]]

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Netflix Data Visualization
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" color="success" onClick={handleReset}>Reset and Start</Button>
            </Box>
          </Paper>

        </React.Fragment>
      ) : (
        <React.Fragment>
          <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <FormControl color='background'
              sx={{ display: 'flex', m: 1, width: { xs: 80, sm: 150, md: 200 } }}>
              <InputLabel> {form_content[activeStep][0]} </InputLabel>
              <Select
                id='select-dataset'
                label={form_content[activeStep][0]}
              >
                <MenuItem value={'Netflix'}> {form_content[activeStep][1][0]} </MenuItem>
                <MenuItem value={'TV Series'}> {form_content[activeStep][1][1]} </MenuItem>
                <MenuItem value={'Movies'}> {form_content[activeStep][1][2]} </MenuItem>
              </Select>
            </FormControl>
          </Paper>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />


            <Button onClick={handleNext} variant="contained" endIcon={<BarChartIcon />} >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>

          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
