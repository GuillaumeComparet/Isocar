"use client"

import { useState, useEffect } from 'react';
import { Client } from '@/utils/types/globals';
import { Status } from "@prisma/client";
import BanUpdateButton from './(modal)/BanUpdateButton';
import RoleUpdateButton from './(modal)/RoleUpdateButton';

type Props = {
  dataProfiles: Client[];
}

function Clients({dataProfiles}: Props) {
  const [clients, setClients] = useState<Client[]>(dataProfiles);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const changeStatus = async (id: string, newStatus: Status) => {
    try {
      const updatedClients = clients.map((client) =>
        client.id === id ? { ...client, status: newStatus } : client
      );
      setClients(updatedClients);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  const changeRole = async (id: string, newRole: string) => {
    try {
      const updatedClients = clients.map((client) =>
        client.id === id ? { ...client, role: newRole } : client
      );
      setClients(updatedClients);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du role :', error);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone_number.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='pt-8 pb-16 grid place-items-center gap-8'>
      <input
        type="text"
        className="rounded-md px-4 py-2 bg-inherit border w-4/5"
        placeholder="Rechercher par nom, prénom, téléphone ou email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className='text-center'>
        <thead className='border bg-background-opacity'>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Numéro de téléphone</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Compte</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id} className='even:bg-btn-background-hover'>
              <td>{client.last_name}</td>
              <td>{client.first_name}</td>
              <td>{client.phone_number}</td>
              <td>{client.email}</td>
              <td><RoleUpdateButton client={client} changeRole={changeRole}/></td>
              <td><BanUpdateButton client={client} changeStatus={changeStatus}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients