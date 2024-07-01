<?php

namespace App\Entity;

use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[
    ORM\Entity(repositoryClass: EmployeeRepository::class)
]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["employee:read", "dryGoodsLive:employee"])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(["employee:read", "dryGoodsLive:employee"])]
    private ?string $memberNumber = null;

    #[ORM\Column(length: 255)]
    #[Groups(["employee:read", "dryGoodsLive:employee"])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["employee:read", "dryGoodsLive:employee"])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["employee:read", "dryGoodsLive:employee"])]
    private ?string $email = null;

    #[ORM\Column(length: 25, nullable: true)]
    #[Groups(["employee:read", "dryGoodsLive:employee"])]
    private ?string $phoneNumber = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["employee:read", "dryGoodsLive:employee"])]
    private ?string $position = null;

    /**
     * @var Collection<int, DryGoodsLive>
     */
    #[ORM\OneToMany(targetEntity: DryGoodsLive::class, mappedBy: 'employeeId')]
    private Collection $dryGoodsLives;

    public function __construct()
    {
        $this->dryGoodsLives = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMemberNumber(): ?string
    {
        return $this->memberNumber;
    }

    public function setMemberNumber(string $memberNumber): static
    {
        $this->memberNumber = $memberNumber;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(?string $position): static
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return Collection<int, DryGoodsLive>
     */
    public function getDryGoodsLives(): Collection
    {
        return $this->dryGoodsLives;
    }

    public function addDryGoodsLife(DryGoodsLive $dryGoodsLife): static
    {
        if (!$this->dryGoodsLives->contains($dryGoodsLife)) {
            $this->dryGoodsLives->add($dryGoodsLife);
            $dryGoodsLife->setEmployeeId($this);
        }

        return $this;
    }

    public function removeDryGoodsLife(DryGoodsLive $dryGoodsLife): static
    {
        if ($this->dryGoodsLives->removeElement($dryGoodsLife)) {
            // set the owning side to null (unless already changed)
            if ($dryGoodsLife->getEmployeeId() === $this) {
                $dryGoodsLife->setEmployeeId(null);
            }
        }

        return $this;
    }
}
