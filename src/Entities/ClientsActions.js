import axios from 'axios';
import { arrayOf, normalize } from 'normalizr';
import { clientSchema,
         clientUserSchema } from 'constants/Schemas';
import { CLIENTS_LOADED,
         CLIENT_USERS_LOADED,
         CLIENT_ADDED,
         CLIENT_USER_ADDED,
         CLIENT_EDITED,
         CLIENT_USER_EDITED } from 'constants/actionTypes';

export function fetchClients() {
  return dispatch => {
    return axios.get('http://localhost:8000/api/clients')
    .then(({data: {clients}}) => {
      const normalizedClients = normalize(clients, arrayOf(clientSchema));
      const normalizedClientUsers = normalize(clients, arrayOf(clientUserSchema));
      dispatch(clientsLoaded(normalizedClients.entities, normalizedClients.result));
      dispatch(clientUsersLoaded(normalizedClientUsers.entities, normalizedClientUsers.result));
    });
  };
}

export function addClient(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/client', 
      content, 
      config
    )
    .then(
      ({data: {client}}) => {
        const normalizedClient = normalize(client, clientSchema);
        const normalizedClientUsers = normalize(client, clientUserSchema);
        dispatch(clientAdded(normalizedClient.entities));
        dispatch(clientUserAdded(normalizedClientUsers.entities));
      }
    );
  };
}

export function editClient(config, content, id) {
  return (dispatch) => {
    return axios.put(
      `http://localhost:8000/api/clients/${id}`, 
      content,
      config
    )
    .then(
      ({data: {client}}) => {
        const normalizedClient = normalize(client, clientSchema);
        const normalizedClientUsers = normalize(client, clientUserSchema);
        dispatch(clientEdited(normalizedClient.entities));
        dispatch(clientUserEdited(normalizedClientUsers.entities));
      }
    );
  };
}

export function clientsLoaded(entities) {
  return {
    type: CLIENTS_LOADED,
    entities
  };
}

export function clientUsersLoaded(entities) {
  return {
    type: CLIENT_USERS_LOADED,
    entities
  };
}

export function clientAdded(entities, clientId) {
  return {
    type: CLIENT_ADDED,
    entities,
    clientId
  };
}

export function clientUserAdded(entities) {
  return {
    type: CLIENT_USER_ADDED,
    entities
  };
}

export function clientEdited(entities) {
  return {
    type: CLIENT_EDITED,
    entities
  };
}

export function clientUserEdited(entities) {
  return {
    type: CLIENT_USER_EDITED,
    entities
  };
}