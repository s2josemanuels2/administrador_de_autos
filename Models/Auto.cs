using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AdministradorDeAutos.Models
{
    public class Auto
    {
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "La marca debe contener como máximo 50 carácteres")]
        public string Marca { get; set; }
        [Required]
        [MaxLength(50,ErrorMessage = "El modelo debe contener como máximo 50 carácteres")]
        public string Modelo { get; set; }
        [MaxLength(100,ErrorMessage = "La descripción debe tener menos de 100 carácteres")]
        public string Descripcion { get; set; }
        [Range(0,9000,ErrorMessage = "El año debe estar en el rango de 0 a 9000")]
        public int Anio { get; set; }
        [Required]
        [Range(0,1000000, ErrorMessage = "Los kilometros deben estar en el rango de 0 a 1,000,000")]
        public int Kilometros { get; set; }
        [Required]
        [Range(1,10000000, ErrorMessage = "El precio debe estar en rango de 1 a 10,000,000")]
        public decimal Precio { get; set; }
    }
}
