import React, { useState } from 'react'

type Props = {
  closeModal: () => void;
};

const CguModal = ({closeModal}: Props) => {

  return (
    <div>
      <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
        <div className='show-modal'>
          <button onClick={closeModal} className='close-modal-btn'>X</button>
          <div className='flex flex-col gap-y-5 h-5/6 overflow-y-auto'>
            <h2 className='title'>Conditions Générales d'Utilisation (CGU)</h2>
            <p>
              <strong className='text-lg text-highlight'>Préambule</strong><br/>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les conditions d'utilisation du site web du Garage Comparet, accessible à l'adresse www.garagecomparet.fr. En accédant et en utilisant ce site, vous acceptez sans réserve les présentes CGU.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 1 : Objet du site</strong><br/>
              Le site web du Garage Comparet permet aux utilisateurs de prendre rendez-vous pour des interventions de base sur leurs véhicules. Les utilisateurs peuvent également trouver des informations sur les services proposés par le garage.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 2 : Collecte des données personnelles</strong><br/>
              En utilisant le site, les utilisateurs peuvent être amenés à fournir des données personnelles telles que le nom, le numéro de téléphone, l'adresse e-mail et la plaque d'immatriculation de leur véhicule. Ces informations sont nécessaires pour la prise de rendez-vous et pour garantir un service de qualité.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 3 : Protection des données personnelles</strong><br/>
              Le Garage Comparet s'engage à protéger les données personnelles des utilisateurs conformément à la législation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD). Les données collectées ne sont utilisées que dans le cadre des services proposés par le garage et ne sont en aucun cas cédées à des tiers sans l'accord préalable des utilisateurs.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 4 : Utilisation des données personnelles</strong><br/>
              Les données personnelles collectées sur le site sont utilisées pour :
              La prise de rendez-vous et la gestion des interventions sur les véhicules.
              La communication avec les utilisateurs concernant leur rendez-vous ou toute autre demande relative aux services du garage.
              L'amélioration des services proposés par le garage.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 5 : Droits des utilisateurs</strong><br/>
              Conformément à la législation en vigueur, les utilisateurs disposent d'un droit d'accès, de rectification, de suppression et d'opposition concernant leurs données personnelles. Pour exercer ces droits, les utilisateurs peuvent contacter le Garage Comparet à l'adresse e-mail suivante : contact@garagecomparet.fr.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 6 : Responsabilités de l'utilisateur</strong><br/>
              L'utilisateur s'engage à fournir des informations exactes et à jour lors de l'utilisation des services du site. Toute utilisation frauduleuse ou détournée des services du site peut entraîner des sanctions et des poursuites judiciaires.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 7 : Propriété intellectuelle</strong><br/>
              Tous les contenus présents sur le site (textes, images, logos, etc.) sont la propriété exclusive du Garage Comparet ou de ses partenaires. Toute reproduction ou utilisation non autorisée de ces contenus est strictement interdite.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 8 : Limitation de responsabilité</strong><br/>
              Le Garage Comparet s'efforce d'assurer l'exactitude et la mise à jour des informations présentes sur le site. Toutefois, il ne peut être tenu responsable des erreurs, omissions ou des éventuels dommages résultant de l'utilisation du site.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 9 : Modifications des CGU</strong><br/>
              Le Garage Comparet se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de ces modifications par une mention spéciale sur le site ou par e-mail.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Article 10 : Droit applicable et juridiction compétente</strong><br/>
              Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
            <p>
              <strong className='text-lg text-highlight'>Contact</strong><br/>
              Pour toute question ou demande d'information concernant les présentes CGU, vous pouvez nous contacter à l'adresse e-mail suivante : garage.comparet@gmail.com.
              En utilisant le site web du Garage Comparet, vous reconnaissez avoir pris connaissance des présentes CGU et les accepter sans réserve.
            </p>
        </div>
      </div> 
    </div>
  )
}

export default CguModal