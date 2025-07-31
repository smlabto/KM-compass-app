'use client';

import { useState } from "react";
import { Grid, Typography, CircularProgress, Fade } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CustomButton from "../../components/CustomButton";
import StepBody from "./StepBody";
import { Stakeholder } from "@/types/types";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

interface StepOneProps {
  stakeholders: Stakeholder[];
  selectedStakeholder: Stakeholder | null;
  setSelectedStakeholder: (s: Stakeholder) => void;
  goNext: () => void;
  goBack: () => void;
  currentStep: number;
}

export default function StepOne({
  stakeholders,
  selectedStakeholder,
  setSelectedStakeholder,
  goNext,
  goBack,
  currentStep
}: StepOneProps) {

  const isLoading = stakeholders.length === 0;
  const [showList, setShowList] = useState(true);

  const handleSelection = (node: Stakeholder) => {
    setSelectedStakeholder(node);
    setShowList(false);
    goNext();
  };

  return (
    <Fade in={showList} appear >
      <div>
        <StepBody title="Select a Stakeholder" subTitle="Select the audience you want to communicate with" goNext={goNext} goBack={goBack} showBack={false} currentStep={currentStep}>
          <div style={{ padding: 4 }}>
            {isLoading ? (
              <CircularProgress />
            ) : (

                <Grid container spacing={2} columns={2}>
                  {stakeholders.map((node) => {
                    const isSelected = selectedStakeholder?.name === node.name;

                    return (
                      <Grid key={node.name} size={{ xs: 2, sm: 1, xl: 1 }}>
                        <CustomButton
                          onClick={() => handleSelection(node)}
                          sx={{
                            width: '100%',
                            height: '100%',
                            minHeight: '90px',
                            p: 1.5,
                            textTransform: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderColor: isSelected ? '#9c27b0' : undefined,
                            backgroundColor: isSelected ? '#f3e5f5' : undefined,
                          }}
                          variant="outlined"
                        >
                          <PlayCircleIcon color="success" sx={{position: 'absolute', right: '10px', top: '10px'}} />

                          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', paddingBottom: 10 }}>
                            <PermIdentityIcon sx={{ color: '#a233b5', fontSize: 20 }} />
                            <Typography variant="body1" color="#a233b5" sx={{ fontWeight: 600, fontSize: 15, ml: 1 }}>
                              {node.label}
                            </Typography>
                          </div>

                          <Typography variant="body2" color="grey" sx={{ fontSize: 11 }}>
                            {node.summary}
                          </Typography>

                        </CustomButton>
                      </Grid>
                    );
                  })}
                </Grid>
            )}
          </div>
        </StepBody>
      </div>
    </Fade>
  );
}
