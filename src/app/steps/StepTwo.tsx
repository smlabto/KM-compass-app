'use client';

import { useState, useMemo } from "react";
import { Fade, Grid, Typography, Box, Tooltip, tooltipClasses, useMediaQuery } from "@mui/material";
import CustomButton from "../../components/CustomButton";
import GroupsIcon from '@mui/icons-material/Groups';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import CampaignIcon from '@mui/icons-material/Campaign';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import StepBody from "./StepBody";
import { Strategy, Example, Stakeholder } from "@/types/types";

import { useLang } from '../../components/ThemeProviderWrapper';

interface StepTwoProps {
  strategies: Strategy[];
  examples: Example[];
  selectedStakeholder: Stakeholder | null;
  selectedStrategy: Strategy | null;
  setSelectedStrategy: (s: Strategy) => void;
  goNext: () => void;
  goBack: () => void;
  currentStep: number;
}

export default function StepTwo({
  strategies,
  // examples,
  selectedStakeholder,
  selectedStrategy,
  setSelectedStrategy,
  goNext,
  goBack,
  currentStep
}: StepTwoProps) {
  const { lang } = useLang();

  const [showList, setShowList] = useState(true);
  
  const isMobile = useMediaQuery('(max-width:780px)');

  const textKeys = useMemo(() => {
    return {
      "dissemination": lang === "fr" ? "Stratégies de diffusion" : "Dissemination Strategies",
      "engagement": lang === "fr" ? "Stratégies d'engagement" : "Engagement Strategies",
      "dissemination_desc": lang === "fr" ? 
        "Les stratégies de diffusion se concentrent sur la communication unidirectionnelle qui partage les résultats de la recherche avec des publics généraux ou ciblés en utilisant des formats accessibles et attrayants. Ces stratégies visent à sensibiliser, à éclairer la prise de décision et à soutenir l'adoption de la recherche liée à la désinformation, à la culture numérique et aux préjudices en ligne par le biais de divers médias et canaux de communication." : 
        "Dissemination strategies focus on one-way communication that shares research evidence with general or targeted audiences using accessible and engaging formats. These strategies aim to raise awareness, inform decision-making, and support the uptake of research related to mis- and disinformation, digital literacy, and online harms across diverse media and communication channels.",
      "engagement_desc": lang === "fr" ? 
        "Les stratégies d'engagement se concentrent sur une communication interactive et bidirectionnelle qui implique activement les parties prenantes dans l'interprétation, l'adaptation ou la co-création des connaissances. Elles visent à donner aux parties prenantes les moyens d'influencer la manière dont les résultats de la recherche sur la désinformation et les autres dommages en ligne sont appliqués aux défis du monde réel." : 
        "Engagement strategies focus on interactive, two-way communication that actively involves stakeholders in the interpretation, adaptation, or co-creation of knowledge. They are intended to empower stakeholders to shape how research evidence focusing on mis- and disinformation and other online harms is applied to real-world challenges.",
    }
  }, [lang]);


  if (!strategies.length) {
    return <Typography>Loading strategies...</Typography>;
  }

  const handleSelection = (node: Strategy) => {
    setSelectedStrategy(node);
    setShowList(false);
    goNext();
  };

  return (
    <Fade in={showList} appear >
      <div>
        <StepBody
          title={
            <>
              Select a Strategy
            </>
          }
          subTitle={
            <>
              The following are Knowledge Mobilization strategies for <b style={{ color: "#9c27b0" }}>{selectedStakeholder?.label}</b>
            </>
          }
          goNext={goNext} goBack={goBack} showBack={true} currentStep={currentStep}
        >
          <Grid container spacing={8} columns={{ xs: 1, md: 2 }} sx={{ justifyContent: "center", mb: 6, mt: 4 }}>

            {["dissemination", "engagement"].map((strat_type) => {
              // Color by strategy type
              const color = strat_type === "dissemination" ? "#445fd8" : "#c5572f";

              return (
                <Grid key={strat_type} size={1}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', placeSelf: 'center', mb: 2 }}>
                    {strat_type === 'dissemination' ? (
                      <CampaignIcon fontSize="medium" sx={{ color }} />
                    ) : (
                      <GroupsIcon fontSize="medium" sx={{ color }} />
                    )}

                    <Typography sx={{ fontWeight: 700, color: color, ml: 1.5, mr: 0.5, textAlign: 'center', '&::first-letter': { textTransform: 'uppercase' } }}>{strat_type === "dissemination" ? (textKeys.dissemination) : (textKeys.engagement)}</Typography>
                      
                    {isMobile ? (
                      <Box
                        sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => alert(strat_type === 'dissemination'
                          ? textKeys.dissemination_desc
                          : textKeys.engagement_desc
                        )}
                      >
                        <InfoOutlineIcon sx={{ fontSize: 20, mb: '3px', ml: 0.5 }} color="success" />
                      </Box>
                      ) : (
                      <Tooltip
                        slotProps={{
                          popper: {
                            sx: {
                              [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                              {
                                marginTop: '8px',
                              },
                            },
                          },
                          tooltip: {
                            sx: {
                              backgroundColor: '#000000ea',
                              color: 'white',
                              fontSize: 12,
                              [`& .${tooltipClasses.arrow}`]: {
                                color: '#000000ea', // sets arrow color
                              },
                            },
                          },
                        }}
                        title={strat_type === 'dissemination' ? (
                          <Typography sx={{fontSize: 14, textAlign: 'center', p: 1}} variant='body2'>{textKeys.dissemination_desc}</Typography>
                        ) : (
                          <Typography sx={{fontSize: 14, textAlign: 'center', p: 1}} variant='body2'>{textKeys.engagement_desc}</Typography>
                        )}
                        enterDelay={0}
                        arrow
                      >
                        <InfoOutlineIcon sx={{ fontSize: 20, mb: '3px', ml: 0.5 }} color="success" />
                      </Tooltip>
                    )}
                    
                  </Box>

                  <Grid container spacing={3} columns={1}>
                    {strategies.filter(strat => selectedStakeholder?.strategy_names?.includes(strat.name)).map((node) => {

                      if (node.strategy_type !== strat_type) {
                        return;
                      }

                      const isSelected = selectedStrategy?.name === node.name;

                      return (
                        <Grid key={node.name} size={1}>
                            <CustomButton
                              highlightColor={color}
                              onClick={() => handleSelection(node)}
                              sx={{
                                width: '100%',
                                minHeight: '80px',
                                px: 2.5,
                                py: 2,
                                textTransform: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                borderColor: isSelected ? color : color + 'aa',
                                backgroundColor: isSelected ? color + '20' : undefined,
                              }}
                              variant="outlined"
                            >
                              <PlayCircleIcon color="success" sx={{position: 'absolute', right: '10px', top: '10px'}} />
                              
                              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1.5, width: '100%' }}>
                                <Typography variant="body1" color="black" sx={{ fontWeight: '700', color: color}}>
                                  {node.label}
                                </Typography>
                              </Box>

                              <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="subtitle2" sx={{ fontSize: 11 }}>
                                  {node.summary}
                                </Typography>
                              </Box>

                            </CustomButton>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}
            
          </Grid>

        </StepBody></div></Fade>
  );
}
