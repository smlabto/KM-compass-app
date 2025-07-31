'use client';

import { useState, Fragment } from "react";
import { 
  Typography, 
  Paper, 
  Divider, 
  Box,
  Grid, 
  Tab, 
  Tabs, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Badge,
  Snackbar,
  IconButton,
} from "@mui/material";
import { TabPanel, TabContext } from '@mui/lab';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import CloseIcon from '@mui/icons-material/Close';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StepBody from "./StepBody";
import { Strategy, Example } from "@/types/types";
import Image from 'next/image';

import { useLang } from '../../components/ThemeProviderWrapper';
import KeyList from "@/components/KeyList";

interface StepThreeProps {
  strategies: Strategy[];
  examples: Example[];
  // selectedStakeholder: Stakeholder | null;
  selectedStrategy: Strategy | null;
  selectedImplementation: Example | null;
  setSelectedImplementation: (s: Example | null) => void;
  goNext: () => void;
  goBack: () => void;
  currentStep: number;
}

export default function StepThree({
  // strategies,
  examples,
  // selectedStakeholder,
  selectedStrategy,
  // selectedImplementation,
  setSelectedImplementation,
  goNext,
  goBack,
  currentStep
}: StepThreeProps) {
  const { lang } = useLang();
  
  const [value, setValue] = useState<string | null>(null);
  
  const [openedSnack, setOpenedSnack] = useState(true);
  const [imgExists, setImgExists] = useState(true);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenedSnack(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setImgExists(true);
    const chosen: Example | null = examples.filter(ex => selectedStrategy?.example_names?.includes(ex.name)).at(parseInt(newValue)) || null;
    setSelectedImplementation(chosen)

    setValue(newValue);
  };

  // Get filtered examples
  const filteredExamples = examples.filter(ex => selectedStrategy?.example_names?.includes(ex.name));

  return (
    <StepBody
      title={
        <>
          Select an Implementation
        </>
      }
      subTitle={
        <>
          Learn about implementations of <b style={{ marginLeft: '1px', color: selectedStrategy?.strategy_type === "dissemination" ? "#445fd8" : "#c5572f" }}>{selectedStrategy?.label}</b>
        </>
      }
      goNext={goNext} goBack={goBack} showBack={true} currentStep={currentStep}
    >
      
      <Tabs
        variant="scrollable"
        onChange={handleChange}
        value={value || false}
        allowScrollButtonsMobile
        scrollButtons="auto"
        sx={{
          overflowY: 'auto', 
          placeSelf: 'center',
          justifyItems: 'center',
          m: 0,
          p: 0,
          width: {
            xs: '100vw',
            sm: '100vw',
            md: 'unset'
          },
        }}
      >
        {filteredExamples.map((example, index) => {
          const isSelected = value === index.toString();
          const highlightColor = '#1976d2dd';

          return (
            <Tab
              key={example.name}
              value={index.toString()}
              label={example.label || `Example ${index + 1}`}
              disableRipple
              color="info"
              sx={{
                textTransform: 'none',
                px: 2,
                py: 2,
                my: 1,
                mx: 1,
                minHeight: 'auto',
                fontWeight: 600,
                fontSize: 15,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                color: '#333',
                boxShadow: '1px 1px 5px 0px hsl(224.1deg 100% 31.6% / 34%)',
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                ...(isSelected && {
                  border: `1px solid ${highlightColor}`,
                }),
                '&:hover': {
                  border: `1px solid ${highlightColor}`,
                  backgroundColor: '#fff',
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                },
              }}
            />
          );
        })}
      </Tabs>

      <br />

      <Paper sx={{ boxShadow: "#7575757d 0px 0px 9px 2px", borderRadius: 3 }}>
        {value === null ? (
          <Box sx={{color: 'grey', placeItems: 'center', textAlign: 'center', py: 5}}>
            <KeyboardDoubleArrowUpIcon sx={{pb: 1, fontSize: 40}} />
            <Typography variant="h6" >{lang === 'fr' ? "Sélectionnez une mise en œuvre ci-dessus" : "Select an Implementation above"}</Typography>
          </Box>
        ) : (
          <TabContext value={value}>
            <Box sx={{ display: 'flex', p: 0 }}>

              <Box sx={{ flexGrow: 1, textAlign: 'left', p: 0, overflowY: 'auto' }}>
                {filteredExamples.map((example, index) => (
                  <TabPanel
                    sx={{ pt: 4, p: 4 }} 
                    key={example.name} 
                    value={index.toString()}
                  >
                    <Box 
                      sx={{
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        height: 'fit-content', 
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box>
                        <Typography variant="h4" fontSize={{xs: '1.8rem', md: '2.125rem'}} sx={{fontWeight: '600', textAlign: 'left', alignSelf: 'center', mb: 1}}>{example.label}</Typography>
                        <Typography variant="body2" fontSize={{xs: '0.8rem', md: '0.875rem'}} >
                          {example.summary}
                        </Typography>
                      </Box>

                      <Box sx={{placeSelf: 'center', px: 4, py: 2, pb: 1}}>
                        {imgExists && (
                          <Image
                            src={`/img/${example.name.replace(/[^\w]/g, '')}.png`}
                            alt="image"
                            width={100}
                            height={100}
                            onError={() => setImgExists(false)}
                          />
                        )}
                      </Box>
                    </Box>
                    
                    <br />
                    
                    {(() => {
                      // Find the example matching the selectedStrategy and current index
                      const ex = filteredExamples.at(parseInt(value || '0'));
                      
                      let strengths : string[] = [];
                      let considerations : string[] = [];
                      if (ex?.keyStrengths?.trim()) {
                        strengths = ex.keyStrengths.split("|");
                      }
                      if (ex?.keyConsiderations?.trim()) {
                        considerations = ex.keyConsiderations.split("|");
                      }

                      return (
                        <Grid container columns={2} spacing={2}>
                          <KeyList type="strengths" values={strengths}></KeyList>
                          <KeyList type="considerations" values={considerations}></KeyList>
                        </Grid>
                      );

                    })()}

                    <Divider sx={{my: 4}}></Divider>

                    <Badge 
                      badgeContent={<BookmarkIcon sx={{color: '#bf1111', fontSize: 40, transform: 'scaleY(1.3)'}} />}
                      sx={{
                        '& .MuiBadge-badge': {
                          right: {xs: 25, sm: 40},
                          top: 16,
                          // border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
                          padding: '0 4px',
                        },
                        width: '100%',
                      }}
                    >
                      <Card sx={{ boxShadow: 'none', "border": "1px solid #171d833e", color: "#171d83", background: "#e9efff", borderRadius: 3, width: '100%' }}>
                      
                        <CardContent sx={{color: "", p: 0, px: 2, pb: '12px !important'}}>
                          <Box sx={{ py: 2, pb: 1, maxWidth: "88%" }}>
                            <Typography fontSize={{xs: 16, sm: 18}} fontWeight={600} variant="h6">{lang === 'fr' ? "Exemple:" : "Example:"} <span style={{fontWeight: 500}}>{example.exampleTitle}</span></Typography>

                          </Box>

                          <Typography sx={{py: 1}} fontSize={{xs: 12, sm: 14}} variant="body1">
                            {example.exampleText || 'No paper summary provided.'}
                          </Typography>
                        </CardContent>
                        
                        <CardActions sx={{p: 0, float: 'right', width: '100%'}}>
                          <Button component="a" href={example.exampleLink} target="_blank" size="small" sx={{ width: '100%', textTransform: 'none', py: 1, fontSize: 16}}>{lang === 'fr' ? (<>En savoir plus</>): (<>Learn More</>)}&nbsp;<OpenInNewIcon fontSize="small" /></Button>
                        </CardActions>

                      </Card>
                    </Badge>

                    
                  </TabPanel>
                ))}
              </Box>
            </Box>
          </TabContext>
        )}

      </Paper>
      <Snackbar
        open={openedSnack}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') {
            setOpenedSnack(false);
          }
        }}
        message={
          <span style={{lineHeight: "1.5em"}}>
            <a
              href="https://example.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: '#1976d2',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {lang === 'fr' ? "Donner votre avis" : "Provide Feeback"}
              <OpenInNewIcon fontSize="small" />
            </a>
          </span>
        }
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
          root: {
            sx: {
              minWidth: 'unset',
              maxWidth: 350,
            }
          },
          content: {
            sx: {
              minWidth: 'unset',
              backgroundColor: 'white',
              color: 'black',
              boxShadow: 3,
              '& .MuiSnackbarContent-message': {
                minWidth: 'unset',
                // width: '85%',
              },
              '& .MuiSnackbarContent-action': {
                ml: 0,
                // width: '85%',
              },
              '&.MuiSnackbarContent-root': {
                minWidth: 'unset',
              },
            },
          },
        }}
        sx={{maxWidth: 350, minWidth: 'unset'}}
      />


    </StepBody>
  );

}