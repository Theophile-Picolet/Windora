import { useNavigate } from "react-router-dom";
import "../styles/FormPage.css";
import { useEffect, useState } from "react";
import { useWeather } from "../components/WeatherContext";

export default function FormPage() {
  const navigate = useNavigate();
  const { name, setName } = useWeather();
  const [existingUsers, setExistingUsers] = useState([] as string[]);

  // Charge la liste des utilisateurs existants au chargement du composant
  useEffect(() => {
    // Récupère tous les favoris des utilisateurs du localStorage
    const allUserFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "{}",
    );
    // Filtre pour ne garder que les utilisateurs non anonymes
    const users = Object.keys(allUserFavorites).filter(
      (user) => user !== "Explorateur",
    );
    setExistingUsers(users);
  }, []);

  const deleteUser = (userToDelete: string) => {
    // Demande confirmation à l'utilisateur avant de supprimer
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur ${userToDelete} et tous ses favoris ?`,
      )
    ) {
      // Récupère l'objet contenant tous les favoris des utilisateurs du localStorage
      // Si aucun favori n'existe, utilise un objet vide par défaut
      const allUserFavorites = JSON.parse(
        localStorage.getItem("userFavorites") || "{}",
      );

      // Supprime l'entrée correspondant à l'utilisateur et ses favoris
      delete allUserFavorites[userToDelete];

      // Sauvegarde l'objet mis à jour dans le localStorage
      localStorage.setItem("userFavorites", JSON.stringify(allUserFavorites));

      // Met à jour la liste des utilisateurs dans l'état local
      // en filtrant l'utilisateur supprimé
      setExistingUsers((prev) => prev.filter((user) => user !== userToDelete));

      // Affiche un message de confirmation à l'utilisateur
      alert(`L'utilisateur ${userToDelete} a été supprimé avec succès.`);
    }
  };

  // Gère la soumission du formulaire
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    // Sauvegarde l'utilisateur courant dans le localStorage
    localStorage.setItem("currentUser", name);
    // Redirige vers la page météo
    navigate("/Weather");
  };

  // Gère les changements dans le champ de saisie du nom
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Met à jour le state avec la nouvelle valeur
    setName(e.currentTarget.value);
  };

  // Gère le clic sur le bouton "Je ne veux pas donner un nom"
  const handleSecondaryButton = () => {
    // Configure l'utilisateur comme anonyme
    localStorage.setItem("currentUser", "Explorateur");
    setName("Explorateur");
    // Redirige vers la page météo
    navigate("/Weather");
  };

  // Gère la sélection d'un utilisateur existant
  const selectExistingUser = (selectedUser: string) => {
    // Configure l'utilisateur sélectionné comme utilisateur courant
    localStorage.setItem("currentUser", selectedUser);
    setName(selectedUser);
    // Redirige vers la page météo
    navigate("/Weather");
  };

  return (
    <section className="form-container">
      <h1>Bienvenue sur Windora</h1>
      <p>Explorateur de météo</p>
      <form className="search-form" onSubmit={onSubmit}>
        <label htmlFor="name">Votre nom</label>
        <input
          type="text"
          id="name"
          className="search-input"
          value={name}
          onChange={onChange}
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>

        {existingUsers.length > 0 && (
          <div className="existing-users">
            <p>Ou sélectionnez un explorateur existant :</p>
            <div className="users-list">
              {existingUsers.map((user) => (
                <div key={user} className="user-card">
                  <button
                    type="button"
                    className="user-button"
                    onClick={() => selectExistingUser(user)}
                  >
                    {user}
                  </button>
                  <button
                    type="button"
                    className="delete-user-button"
                    onClick={() => deleteUser(user)}
                    aria-label={`Supprimer l'utilisateur ${user}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          className="secondary-button"
          onClick={handleSecondaryButton}
        >
          Je ne veux pas donner un nom
        </button>
      </form>
    </section>
  );
}
