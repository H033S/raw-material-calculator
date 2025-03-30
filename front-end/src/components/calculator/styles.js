
export const styles = {
  container: {
    width: '100%',
    maxWidth: '1024px',
    margin: '0 auto', 
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  section: {
    marginBottom: '1.5rem'
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    padding: '1rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  flex: {
    display: 'flex'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem'
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer'
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #D1D5DB',
    borderRadius: '0.375rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.25rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '32rem',
    maxHeight: '90vh',
    overflowY: 'auto'
  }
};
