import * as changeCase from 'change-case';

export function getRepositoryTemplate(repositoryName: string, packageRepository: string, packageEntity: string): string {
  const pascalCaseRepositoryName = changeCase.pascalCase(repositoryName.toLowerCase());
  const snakeCaseRepositoryName = changeCase.snakeCase(repositoryName.toLowerCase());
  return `package ${packageRepository};

  import org.springframework.data.domain.Page;
  import org.springframework.data.domain.Pageable;
  import org.springframework.data.jpa.repository.JpaRepository;
  import org.springframework.data.jpa.repository.Query;
  import org.springframework.stereotype.Repository;
  
  import ${packageEntity}.${pascalCaseRepositoryName};
  
  @Repository
  public interface ${pascalCaseRepositoryName}Repository extends JpaRepository<${pascalCaseRepositoryName}, String> {
  
    // @Query("select p from ${pascalCaseRepositoryName} p where p._ATRIBUTO_ like %1%")
    @Query("select p from ${pascalCaseRepositoryName} p")
    Page<${pascalCaseRepositoryName}> findAllBySearch(String search, Pageable pageable);
  }
`;
}




