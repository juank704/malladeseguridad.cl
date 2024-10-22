import React from 'react';

const Footer: React.FC = () => {
    return (
      <footer className="bg-blue-900 text-white py-10">
        <div className="container mx-auto flex flex-wrap justify-between gap-8">
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Sobre Nosotros</h3>
            <p className="text-sm">
              Empresa dedicada a la instalación de mallas de seguridad para tu hogar, con calidad garantizada y servicio rápido.
            </p>
          </div>
  
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#servicios" className="hover:text-green-400">Servicios</a></li>
              <li><a href="#contacto" className="hover:text-green-400">Contacto</a></li>
              <li><a href="#faq" className="hover:text-green-400">FAQ</a></li>
            </ul>
          </div>
  
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-400 text-sm">
          &copy; 2024 Mallas de Seguridad. Todos los derechos reservados.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  