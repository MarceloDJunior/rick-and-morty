import { gql } from '@apollo/client';

export const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int, $search: String) {
    characters(page: $page, filter: { name: $search }) {
      info {
        next
      }
      results {
        id
        name
        image
        gender
        episodes: episode {
          id
          name
          air_date
          episode
          created
        }
        location {
          name
          id
        }
        origin {
          name
          id
        }
        species
        status
      }
    }
  }
`;

export const GET_CHARACTER_QUERY = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      gender
      episodes: episode {
        id
        name
        air_date
        episode
        created
      }
      location {
        name
        id
      }
      origin {
        name
        id
      }
      species
      status
    }
  }
`;
