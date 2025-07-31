"use client";

import { Suspense } from 'react';

import { Container, Box, CircularProgress, Typography, Button } from '@mui/material'
import React, { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Stakeholder, Strategy, Example} from '../types/types';
import DrawStepper from '../components/DrawStepper';
import Image from 'next/image';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLang } from '../components/ThemeProviderWrapper';

function WizardPage() {
  const { lang } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Data states
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [examples, setExamples] = useState<Example[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Selection states
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [selectedImplementation, setSelectedImplementation] = useState<Example | null>(null);
  
  // Current step calculation
  const [currentStep, setCurrentStep] = useState(0);

  const initialGetStarted = Boolean(
    searchParams.get("stakeholder") || searchParams.get("strategy")
  );

  
  function handleGetStarted() {
    setGetStarted(true);
  }

  // Automatically skip welcome screen if either parameter exists
  useEffect(() => {
    const stakeholderParam = searchParams.get("stakeholder");
    const strategyParam = searchParams.get("strategy");
    if (stakeholderParam || strategyParam) {
      setGetStarted(true);
    }
  }, [searchParams]);


  const [getStarted, setGetStarted] = useState(initialGetStarted);

  const steps = useMemo(() => {
    return [
      { label: lang === "fr" ? "Sélectionner un partie prenante" : "Select a Stakeholder", component: StepOne },
      { label: lang === "fr" ? "Sélectionner une stratégie" : "Select a Strategy", component: StepTwo },
      { label: lang === "fr" ? "Sélectionner une mise en œuvre" : "Select an Implementation", component: StepThree }
    ];
  }, [lang]);
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const file = lang === "fr" ? "/json/data_fr.json" : "/json/data.json";
        const response = await fetch(file);
        const loadedData = await response.json();
        
        const loadedStakeholders = (loadedData as Stakeholder[]).filter(
          (node): node is Stakeholder => node.type === 'stakeholder'
        );
        const loadedStrategies = (loadedData as Strategy[]).filter(
          (node): node is Strategy => node.type === 'strategy'
        );

        setStakeholders(loadedStakeholders);
        setStrategies(loadedStrategies);
        
        const exampleFile = lang === "fr" ? "/json/examples_fr.json" : "/json/examples.json";
        const exampleResponse = await fetch(exampleFile);
        const exampleData = await exampleResponse.json();
        
        setExamples((exampleData as Example[]).filter(
          (node) => node.type === 'example'
        ));
        
        setDataLoaded(true);
      } catch (error) {
        console.error('Failed to load data:', error);
        setDataLoaded(true); // Set to true even on error to prevent infinite loading
      }
    };

    loadData();
  }, [lang]);


  // Process URL parameters and validate selections
  useEffect(() => {
    if (!dataLoaded) return; // Wait for data to load before processing URL
    
    const stakeholderParam = searchParams.get("stakeholder");
    const strategyParam = searchParams.get("strategy");
    
    // Find stakeholder by name
    let validStakeholder: Stakeholder | null = null;
    if (stakeholderParam) {
      validStakeholder = stakeholders.find(s => s.name === decodeURIComponent(stakeholderParam)) || null;
    }
    
    // Find strategy by name
    let validStrategy: Strategy | null = null;
    if (strategyParam) {
      validStrategy = strategies.find(s => s.name === decodeURIComponent(strategyParam)) || null;
    }
    
    // Redirect user to start of steps if any parameter options are invalid
    if (stakeholderParam && !validStakeholder) {
      router.replace('/');
      return;
    }
    
    if (strategyParam && !validStrategy) {
      router.replace('/');
      return;
    }
    
    if (strategyParam && !stakeholderParam) {
      router.replace('/');
      return;
    }
    
    // Set the valid selections
    setSelectedStakeholder(validStakeholder);
    setSelectedStrategy(validStrategy);
    
    // Determine current step based on valid selections
    if (validStrategy) {
      setCurrentStep(2); // Review step
    } else if (validStakeholder) {
      setCurrentStep(1); // Strategy selection step
    } else {
      setCurrentStep(0); // Stakeholder selection step
    }
    
  }, [searchParams, stakeholders, strategies, dataLoaded, router]);

  // Navigation functions
  const updateURL = (stakeholder?: Stakeholder | null, strategy?: Strategy | null) => {
    const params = new URLSearchParams();
    
    if (selectedImplementation) {
      setSelectedImplementation(null);
    }

    if (stakeholder) {
      params.set('stakeholder', encodeURIComponent(stakeholder.name));
    }
    
    if (strategy && stakeholder) {
      params.set('strategy', encodeURIComponent(strategy.name));
    }
    
    const urlString = params.toString();
    const newUrl = urlString ? `?${urlString}` : '/';
    router.push(newUrl);
  };

  const goNext = () => {
    if (currentStep === 0 && selectedStakeholder) {
      updateURL(selectedStakeholder);
    } else if (currentStep === 1 && selectedStakeholder && selectedStrategy) {
      updateURL(selectedStakeholder, selectedStrategy);
    }
  };

  const goBack = () => {
    if (currentStep === 2) {
      // Go back to strategy selection
      updateURL(selectedStakeholder);
    } else if (currentStep === 1) {
      // Go back to stakeholder selection
      updateURL();
    }
  };

  const handleStakeholderSelection = (stakeholder: Stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setSelectedStrategy(null);
    updateURL(stakeholder);
  };

  const handleStrategySelection = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    updateURL(selectedStakeholder, strategy);
  };

  // Show progress until data is loaded
  if (!dataLoaded) {
    return (
      <Container sx={{textAlign: 'center', height: 800}}>
        <Box sx={{pt: 30}}>
          <CircularProgress sx={{scale: 2}} color="secondary" />
        </Box>
      </Container>
    );
  }

  const CurrentStep = steps[currentStep]?.component ?? StepOne;

  const sharedProps = {
    stakeholders,
    strategies,
    examples,
    goNext,
    goBack,
    selectedStakeholder,
    setSelectedStakeholder: handleStakeholderSelection,
    selectedStrategy,
    setSelectedStrategy: handleStrategySelection,
    selectedImplementation,
    setSelectedImplementation: setSelectedImplementation,
    currentStep,
  };



  if (!getStarted) {
    return (
      <Container
        sx={{ textAlign: 'center', minHeight: {xs: '650px', sm: '62vh', md: '57vh'}, mt: {xs: '2vh', sm: '3vh', md: '4vh'}, mb: '8vh'}}
      >
        <Box
          sx={{
            maxWidth: {
              xs: '90vw',
              sm: '85vw',
              md: '80vw',
              lg: '75vw',
            },
            margin: '0 auto',
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: '1.8rem',
                sm: '2rem',
                md: '2.3rem',
                lg: '2.5rem',
              },
              fontWeight: 600,
            }}
          >
            {lang === 'fr' ? (
              <>
                Bienvenue à
              </>
            ) : (
              <>
                Welcome to
              </>
            )}
            
          </Typography>

          <Image
              src="/img/km_compass_logo.png"
              alt="KM Compass Logo"
              width={116*2}
              height={71*2}
              style={{marginTop: 15, marginBottom: 8 }}
            />
    
          <Typography
            variant="body1"
            sx={{
              maxWidth: '80%',
              margin: '0 auto',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {lang === 'fr' ? (
              <>
                Pour vous aider à partager ce que vous savez, là où c&rsquo;est le plus important
              </>
            ) : (
              <>
                Helping You Share What You Know, Where It Matters Most
              </>
            )}
          </Typography>

          <Box my={5}>
            <Button variant="contained" color="success" size="large" onClick={handleGetStarted} sx={{ textTransform: 'none', fontSize: 18 }}>
                {lang === 'fr' ? (
                    <>Commencer <NavigateNextIcon /></>
                ) : (
                    <>Get Started <NavigateNextIcon /></>
                )}
            </Button>
          </Box>

          <Typography
            variant="body1"
            sx={{
              maxWidth: '80%',
              margin: '0 auto',
              mt: 4,
            }}
          >
            {lang === 'fr' ? (
              <>
                Cette application est conçue pour aider les chercheurs comme vous à transformer leurs idées en impact. Que vous commenciez à peine ou que vous cherchiez à améliorer vos efforts de <span style={{ fontWeight: 600, color: "#9c27b0" }}>mobilisation des connaissances (KM)</span>, KM Compass vous guidera à chaque étape du processus.
              </>
            ) : (
              <>
                This app is designed to help researchers like you turn ideas into impact. Whether you&rsquo;re just getting started or looking to improve your{' '}
                <span style={{ fontWeight: 600, color: "#9c27b0" }}>
                  Knowledge Mobilization (KM)
                </span>{' '}
                efforts, KM Compass will guide you through the process every step of the way.
              </>
            )}
          </Typography>
    
          <Typography
            variant="body1"
            sx={{
              maxWidth: '80%',
              margin: '0 auto',
              mt: 5,
              fontSize: 12,
              color: 'grey'
            }}
          >
            {lang === 'fr' ? (
              <>
                Développé par le{' '}&quot;
                <a
                  target="_blank"
                  href="https://socialmedialab.ca/"
                  rel="noopener noreferrer"
                >
                  Social Media Lab
                </a>&quot;{' '}
                avec le financement du{' '}
                <a
                  target="_blank"
                  href="https://www.canada.ca/fr/patrimoine-canadien/services/desinformation-en-ligne/programme-contributions-citoyennete-numerique.html"
                  rel="noopener noreferrer"
                >
                  Programme de contributions en matière de citoyenneté numérique
                </a>{' '}
                du{' '}
                <a
                  target="_blank"
                  href="https://www.canada.ca/fr/patrimoine-canadien.html"
                  rel="noopener noreferrer"
                >
                  Patrimoine canadien
                </a>.
              </>
            ) : (
              <>
                Developed by the{' '}
                <a
                  target="_blank"
                  href="https://socialmedialab.ca/"
                  rel="noopener noreferrer"
                >Social Media Lab
                </a>{' '}
                with funding from the{' '}
                <a
                  target="_blank"
                  href="https://www.canada.ca/en/canadian-heritage.html"
                  rel="noopener noreferrer"
                >
                  Department of Canadian Heritage&rsquo;s
                </a>{' '}
                <a
                  target="_blank"
                  href="https://www.canada.ca/en/canadian-heritage/services/online-disinformation/digital-citizen-contribution-program.html"
                  rel="noopener noreferrer"
                >
                  Digital Citizen Contribution Program
                </a>.
              </>
            )}

          </Typography>
    
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{placeItems: 'center'}}>
      <Box sx={{width: '100%', maxWidth: '800px'}}>
        <DrawStepper 
          steps={steps.map(step => step.label)} 
          activeStep={currentStep} 
          stakeholder={selectedStakeholder} 
          strategy={selectedStrategy} 
          implementation={selectedImplementation} 
          updateURL={updateURL}
        />
        <Container>
          <CurrentStep {...sharedProps} />
        </Container>
      </Box>
    </Container>
  );
}


export default function Page() {
  return (
    <Suspense fallback={
      <Container sx={{textAlign: 'center', height: 800}}>
        <Box sx={{pt: 30}}>
          <CircularProgress sx={{scale: 2}} color="secondary" />
        </Box>
      </Container>
    }>
      <WizardPage />
    </Suspense>
  );
}