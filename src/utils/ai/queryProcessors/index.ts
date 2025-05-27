
import { processLocationQuery } from './locationQueries';
import { processDeveloperQuery } from './developerQueries';
import { processEcofriendlyQuery } from './ecofriendlyQueries';
import { processLayoutQuery } from './layoutQueries';
import { processCommercialQuery } from './commercialQueries';
import { processPenthouseQuery } from './penthouseQueries';
import { processAmenitiesQuery } from './amenitiesQueries';
import { processParkingQuery } from './parkingQueries';
import { processConstructionQuery } from './constructionQueries';
import { processSpecificationsQuery } from './specificationsQueries';
import { processUtilitiesQuery } from './utilitiesQueries';
import { processWorkFromHomeQuery } from './workFromHomeQueries';
import { processFinancialQuery } from './financialQueries';
import { processBedroomQuery } from './bedroomQueries';
import { processFeatureQuery } from './featureQueries';
import { processAvailabilityQuery } from './availabilityQueries';
import { QueryProcessorFn } from '../types';

// Combine all query processors into an array for easier processing
export const queryProcessors: QueryProcessorFn[] = [
  processLocationQuery,
  processDeveloperQuery,
  processEcofriendlyQuery,
  processLayoutQuery,
  processCommercialQuery,
  processPenthouseQuery,
  processAmenitiesQuery,
  processParkingQuery,
  processConstructionQuery,
  processSpecificationsQuery,
  processUtilitiesQuery,
  processWorkFromHomeQuery,
  processFinancialQuery,
  processBedroomQuery,
  processFeatureQuery,
  processAvailabilityQuery
];

export {
  processLocationQuery,
  processDeveloperQuery,
  processEcofriendlyQuery,
  processLayoutQuery,
  processCommercialQuery,
  processPenthouseQuery,
  processAmenitiesQuery,
  processParkingQuery,
  processConstructionQuery,
  processSpecificationsQuery,
  processUtilitiesQuery,
  processWorkFromHomeQuery,
  processFinancialQuery,
  processBedroomQuery,
  processFeatureQuery,
  processAvailabilityQuery
};
