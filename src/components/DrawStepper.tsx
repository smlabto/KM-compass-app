import { Box, Chip, Paper, Step, StepLabel, Stepper } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { Stakeholder, Strategy, Example } from '../types/types';
import { StepConnector, stepConnectorClasses, Tooltip } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { styled } from '@mui/material/styles';


interface DrawStepperProps {
  steps: string[];
  activeStep: number;
  stakeholder: Stakeholder | null;
  strategy: Strategy | null;
  implementation: Example | null;
  updateURL: (stakeholder?: Stakeholder | null, strategy?: Strategy | null) => void;
}

export default function DrawStepper({ steps, activeStep, stakeholder, strategy, implementation, updateURL }: DrawStepperProps) {
  interface CustomConnectorProps {
    orientation: 'horizontal' | 'vertical';
  }
  
  const CustomConnector = styled(StepConnector, {
    shouldForwardProp: (prop) => prop !== 'orientation',
  })<CustomConnectorProps>(({ orientation }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      ...(orientation === 'horizontal' && {
        top: 11,
      }),
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
      backgroundImage:
        orientation === 'horizontal'
          ? 'linear-gradient(to right, #4caf50, #4caf50 100%, #e0e0e0 50%)'
          : 'linear-gradient(to bottom, #4caf50, #4caf50 100%, #e0e0e0 50%)',
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
      backgroundColor: '#4caf50',
    },
    [`& .${stepConnectorClasses.root}`]: {
      ...(
        orientation === 'vertical' ? {marginLeft: 2} : {}
      )
    },
    [`& .${stepConnectorClasses.line}`]: {
      border: 0,
      borderRadius: 1,
      backgroundColor: '#e0e0e0',
      ...(orientation === 'horizontal'
        ? {
            height: 3,
          }
        : {
            width: 2,
            minHeight: 10,
            // marginLeft: 11,
          }),
    },
    marginLeft: 12,
    maxHeight: 10,
  }));

  
  const stepProps = {};
  const labelProps = {};

  if (isMobile) {
    return (
      <Paper elevation={3} sx={{ py: 2, pl: 4, mt: 1 }}>
        {/* Vertical Stepper */}
        <Stepper activeStep={activeStep} orientation="vertical" connector={<CustomConnector orientation='vertical' />}>
          {steps.map((label, index) => (
            <Step key={label}>
              
              <StepLabel 
                sx={{
                  '& .MuiStepIcon-root': {
                    padding: '1px',
                    borderRadius: 20
                  },
                  '& .MuiStepIcon-root.Mui-active': {
                    color: 'success.main', // active step icon
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': {
                        boxShadow: '0 0 0 1px rgba(76, 175, 80, 0.5)',
                        background: 'rgba(76, 175, 80, 0.7)',
                      },
                      '70%': {
                        boxShadow: '0 0 0 9px rgba(76, 175, 80, 0)',
                        background: 'rgba(76, 175, 80, 0)',
                      },
                      '100%': {
                        boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                        background: 'rgba(76, 175, 80, 0)',
                      },
                    },
                  },
                  '& .MuiStepIcon-root.Mui-completed': {
                    color: 'success.main', 
                  },
                  '& .MuiStepLabel-label.Mui-active': {
                    color: 'default.main',
                  },
                  '& .MuiStepLabel-label.Mui-completed': {
                    color: 'default.main',
                  },
                  py: 0.5,
                }}
              {...labelProps} >
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
  
                  {/* Step-specific chips */}
                  {index === 0 && (
                    stakeholder ? (
                      <Chip
                        label={stakeholder.label}
                        size="small"
                        color="secondary"
                        sx={{ fontSize: 12, height: 21, cursor: 'pointer' }}
                        onClick={() => updateURL(null, null)}
                        title="Click to change"
                      />
                    ) : (
                      <Chip
                        label={label}
                        size="small"
                        color="default"
                        variant="outlined"
                        sx={{ color: 'grey', borderColor: 'grey', fontSize: 11, height: 21 }}
                      />
                    )
                  )}
                  {index === 1 && (
                    strategy ? (
                      <Chip
                        label={strategy.label}
                        size="small"
                        onClick={() => updateURL(stakeholder, null)}
                        sx={{
                          fontSize: 12,
                          height: 21,
                          color: 'white',
                          backgroundColor: strategy.strategy_type === "dissemination" ? "#445fd8" : "#c5572f",
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: strategy.strategy_type === "dissemination" ? "#3b52bd" : "#a64626"
                          },
                          '&:focus': {
                            backgroundColor: strategy.strategy_type === "dissemination" ? "#364ca9" : "#943f22"
                          }
                        }}
                      />
                    ) : (
                      <Chip
                        label={label}
                        size="small"
                        color="default"
                        variant="outlined"
                        sx={{ color: 'grey', borderColor: 'grey', fontSize: 11, height: 21 }}
                      />
                    )
                  )}
                  {index === 2 && (
                    implementation ? (
                      <Chip
                        label={implementation.label}
                        size="small"
                        color="info"
                        // variant="outlined"
                        sx={{ fontSize: 12, height: 21 }}
                      />
                    ) : (
                      <Chip
                        label={label}
                        size="small"
                        color="default"
                        variant="outlined"
                        sx={{ color: 'grey', borderColor: 'grey', fontSize: 11, height: 21 }}
                      />
                    )
                  )}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    );
  }
  

  return (
    <Box sx={{ p: 3, py: 2, textAlign: 'center', mt: 1 }}>
      <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector orientation="horizontal"/>}>
        {steps.map((label, index) => (
          <Step key={label} {...stepProps} >
            <StepLabel 
              sx={{
                '& .MuiStepIcon-root': {
                  padding: '1px',
                  borderRadius: 20
                },
                '& .MuiStepIcon-root.Mui-active': {
                  color: 'success.main', // active step icon
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      boxShadow: '0 0 0 1px rgba(76, 175, 80, 0.5)',
                      background: 'rgba(76, 175, 80, 0.7)',
                    },
                    '70%': {
                      boxShadow: '0 0 0 9px rgba(76, 175, 80, 0)',
                      background: 'rgba(76, 175, 80, 0)',
                    },
                    '100%': {
                      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                      background: 'rgba(76, 175, 80, 0)',
                    },
                  },
                },
                '& .MuiStepIcon-root.Mui-completed': {
                  color: 'success.main', 
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: 'default.main',
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: 'default.main',
                },
                '& .MuiStepLabel-label': {
                  marginTop: "8px",
                },
              }}
            {...labelProps}>
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0, alignItems: 'center' }}>
                {label}
                {index === 0 && (
                  stakeholder ? (
                    <Tooltip title="Click to change Stakeholder" arrow
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [0, -5],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <Chip
                        label={stakeholder.label}
                        size="small"
                        color="secondary"
                        onClick={() => updateURL(null, null)}
                        sx={{ fontSize: 12, height: 21, mt: 1, px: 1, py: 1.5, cursor: 'pointer' }}
                      />
                    </Tooltip>
                  ) : (
                    <Chip
                      label={<MoreHorizIcon />}
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ color: 'grey', borderColor: 'grey', fontSize: 2, height: 21, width: 80, mt: 1, px: 1, py: 1.5 }}
                    />
                  )
                )}
                {index === 1 && (
                  strategy ? (
                    <Tooltip title="Click to change Strategy" arrow
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [0, -5],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <Chip
                        label={strategy.label}
                        size="small"
                        onClick={() => updateURL(stakeholder, null)}
                        sx={{
                          fontSize: 12,
                          height: 21,
                          mt: 1,
                          px: 1,
                          py: 1.5,
                          color: 'white',
                          backgroundColor: strategy.strategy_type === "dissemination" ? "#445fd8" : "#c5572f",
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: strategy.strategy_type === "dissemination" ? "#3b52bd" : "#a64626"
                          },
                          '&:focus': {
                            backgroundColor: strategy.strategy_type === "dissemination" ? "#364ca9" : "#943f22"
                          }
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Chip
                      label={<MoreHorizIcon />}
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ color: 'grey', borderColor: 'grey', fontSize: 2, height: 21, width: 80, mt: 1, px: 1, py: 1.5 }}
                    />
                  )
                )}
                {index === 2 && (
                  implementation ? (
                    <Chip
                      label={implementation.label}
                      size="small"
                      color="info"
                      // variant="outlined"
                      sx={{ fontSize: 12, height: 21, mt: 1, px: 1, py: 1.5 }}
                    />
                  ) : (
                    <Chip
                      label={<MoreHorizIcon />}
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ color: 'grey', borderColor: 'grey', fontSize: 2, height: 21, width: 80, mt: 1, px: 1, py: 1.5 }}
                    />
                  )
                )}
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
