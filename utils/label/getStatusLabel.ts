export default function getStatusLabel(status: string){
    switch (status) {
      case 'Waiting':
        return 'En attente de validation';
      case 'Validated':
        return 'Validé';
      case 'Canceled':
        return 'Annulé';
      case 'Refused':
        return 'Refusé';
      default:
        return '';
    }
  };
