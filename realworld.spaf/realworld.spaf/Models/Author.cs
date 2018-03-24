using Bridge;

namespace realworld.spaf.Models
{
    [Convention(Target = ConventionTarget.All, Notation = Notation.LowerCamelCase)]
    public class Author
    {
        public string Username { get; set; }
        public object Bio { get; set; }
        public string Image { get; set; }
        public bool Following { get; set; }
    }
}