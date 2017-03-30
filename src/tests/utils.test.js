import { createOptionsList } from 'utils';
import { arrayOf, normalize } from 'normalizr';
import { practiceAreaSchema } from 'constants/Schemas';

describe('utils', () => {
  describe('createOptionsList', () => {
    const sampleDataFromAPI = {
      "practiceAreas": [
        { 
          "id": 1,
          "area": "Dispute Resolution" 
        },
        { 
          "id": 2,
          "area": "Criminal Law" 
        },
        { 
          "id": 3, 
          "area": "Family Law" 
        },
        { 
          "id": 4,
          "area": "Mergers & Acquisitions" 
        }
      ]
    }

    it('should create a list of options', () => {
      const normalized = normalize(
        sampleDataFromAPI.practiceAreas,
        arrayOf(practiceAreaSchema)
      );
      const normalizedData = normalized.entities.practiceAreas;
      const key = 'area';

      expect(createOptionsList(normalizedData, key)).toEqual(
        [
          '1 - Dispute Resolution',
          '2 - Criminal Law',
          '3 - Family Law',
          '4 - Mergers & Acquisitions'
        ]
      );
    });
  });
});